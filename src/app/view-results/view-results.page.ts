import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { ConfigService } from '../config.service';
import { ConfigData, Variable } from '../config';
import { IndexedDbService } from '../indexed-db.service'; // Import IndexedDbService
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.page.html',
  styleUrls: ['./view-results.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule]
})
export class ViewResultsPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  configData: ConfigData | null = null;
  tableData: any[] = [];
  results: any[] = []; // Add results property

  constructor(
    private configService: ConfigService,
    private indexedDbService: IndexedDbService // Inject IndexedDbService
  ) { }

  ngOnInit() {
    this.loadConfig();
    this.loadTableData()
  }

  ngAfterViewInit(): void {

  }

  createChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      // Group results by variable ID
      const groupedResults = this.results.reduce((acc, result) => {
        const key = result.variableID;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(result);
        return acc;
      }, {});

      // Convert grouped results into datasets
      const datasets = Object.keys(groupedResults).map((variableID: string) => {
        const data = groupedResults[variableID].map((result: { variableID: string, relativeSleepScore: number }) => result.relativeSleepScore);
        const backgroundColor = groupedResults[variableID].map((result: { variableID: string, relativeSleepScore: number }) => {
          const value = result.relativeSleepScore;
          return value > 0 ? 'green' : value < 0 ? 'red' : 'grey';
        });
        return {
          label: variableID,
          data: data,
          backgroundColor: backgroundColor
        };
      });

      // Create the chart
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.results.map(result => result.variableID),
          datasets: datasets
        },
        options: {
          scales: {
            x: {
              min: -1,
              max: 1,
              ticks: {
                callback: (value) => {
                  return value === 0 ? '0' : '';
                }
              }
            }
          }
        }
      });
    }
  }


  async loadConfig() {
    try {
      await this.configService.loadConfig();
      this.configData = this.configService.ConfigData;
    } catch (error) {
      console.error('Error loading config:', error);
      this.configData = null; // Reset configData to null in case of error
    }
  }

  getRangeOptions(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i + 1); // Generate an array of numbers from 1 to size
  }


  async loadTableData() {
    try {
      const sleepLogs = await this.indexedDbService.getAllEntries();
      this.populateTable(sleepLogs);
    } catch (error) {
      console.error('Error fetching sleep logs:', error);
    }
  }

  async populateTable(sleepLogs: any[]) {
    await this.configService.loadConfig();
    this.configData = this.configService.ConfigData;
    const results: any[] = [];
    if (this.configData) {
      this.configData.variables.forEach(variable => {
        if (variable.type === 'bool') {
          [true, false].forEach(value => {
            let poorSleepCount = 0;
            let okSleepCount = 0;
            let greatSleepCount = 0;

            sleepLogs.forEach(log => {
              const logVariable = log.variables.find((v: any) => v.id === variable.id);
              if (logVariable && logVariable.value === value) {
                if (log.sleepQuality === 'great') {
                  greatSleepCount++;
                } else if (log.sleepQuality === 'ok') {
                  okSleepCount++;
                } else if (log.sleepQuality === 'poor') {
                  poorSleepCount++;
                }
              }
            });

            const result = {
              variableID: variable.name,
              variableValue: value,
              poorSleepCount: poorSleepCount,
              okSleepCount: okSleepCount,
              greatSleepCount: greatSleepCount
            };
            results.push(result);
          });
        } else if (variable.type === 'range') {
          console.log(variable.name)
          for (let i = 0; i <= variable.range.size; i++) {
            let poorSleepCount = 0;
            let okSleepCount = 0;
            let greatSleepCount = 0;

            sleepLogs.forEach(log => {
              const logVariable = log.variables.find((v: any) => v.id === variable.id);
              if (logVariable && logVariable.value === i) {
                if (log.sleepQuality === 'great') {
                  greatSleepCount++;
                } else if (log.sleepQuality === 'ok') {
                  okSleepCount++;
                } else if (log.sleepQuality === 'poor') {
                  poorSleepCount++;
                }
              }
            });

            const result = {
              variableID: variable.name,
              variableValue: i,
              poorSleepCount: poorSleepCount,
              okSleepCount: okSleepCount,
              greatSleepCount: greatSleepCount
            };
            results.push(result);
          }
        }
      });
      this.results = results;
      this.calculatePercentages()
      console.log(this.results)
      this.createChart();
    }

  }

  calculatePercentages() {
    var totalPoorSleep = 0;
    var totalOKSleep = 0;
    var totalGreatSleep = 0;
    var totalSleepCount = 0;
    this.results.forEach(result => {
      // Calculate total count of all sleep logs for the current variable
      const sleepCount = result.poorSleepCount + result.okSleepCount + result.greatSleepCount;
      totalPoorSleep = totalPoorSleep + result.poorSleepCount;
      totalOKSleep = totalOKSleep + result.okSleepCount;
      totalGreatSleep = totalGreatSleep + result.greatSleepCount;
      totalSleepCount = totalSleepCount + sleepCount
      // Calculate percentages for each category
      result.sleepCount = sleepCount
      result.poorSleepPercentage = (result.poorSleepCount / sleepCount);
      result.okSleepPercentage = (result.okSleepCount / sleepCount);
      result.greatSleepPercentage = (result.greatSleepCount / sleepCount);
    });
    var sleepScore = ((totalPoorSleep * -1) + totalGreatSleep) / totalSleepCount
    console.log(sleepScore)
    this.results.forEach(result => {
      result.variableSleepScore = ((result.poorSleepCount * -1) + result.greatSleepCount) / result.sleepCount
      if (sleepScore > 0) {
        result.relativeSleepScore = result.variableSleepScore - sleepScore
      } else {
        result.relativeSleepScore = result.variableSleepScore + sleepScore
      }
    })
  }

  calculateBarWidth(relativeSleepScore: number): number {
    // Adjust the range and scaling factor according to your specific requirements
    const minScore = -1; // Minimum possible score
    const maxScore = 1; // Maximum possible score
    const maxWidth = 100; // Maximum width of the bar (in percentage)

    // Calculate the width based on the relative sleep score
    // Scale the score to fit within the range [0, 1]
    const scaledScore = (relativeSleepScore - minScore) / (maxScore - minScore);

    // Convert the scaled score to a percentage width within the range [0, maxWidth]
    const width = scaledScore * maxWidth;

    // Ensure that the width is within the valid range [0, maxWidth]
    return Math.max(0, Math.min(maxWidth, width));
  }



}
