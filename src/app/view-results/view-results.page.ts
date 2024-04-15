import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { ConfigService } from '../config.service';
import { ConfigData, Variable } from '../config';
import { IndexedDbService } from '../indexed-db.service'; // Import IndexedDbService

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.page.html',
  styleUrls: ['./view-results.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule]
})
export class ViewResultsPage implements OnInit {

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
    }

  }

  calculatePercentages() {
    this.results.forEach(result => {
      // Calculate total count of all sleep logs for the current variable
      const sleepCount = result.poorSleepCount + result.okSleepCount + result.greatSleepCount;

      // Calculate percentages for each category
      result.sleepCount = sleepCount
      result.poorSleepPercentage = (result.poorSleepCount / sleepCount) * 100;
      result.okSleepPercentage = (result.okSleepCount / sleepCount) * 100;
      result.greatSleepPercentage = (result.greatSleepCount / sleepCount) * 100;
    });
  }



}
