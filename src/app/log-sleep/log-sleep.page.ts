// log-sleep.page.ts

import { Component } from '@angular/core';
import { IonSegment, IonSegmentButton, IonIcon, IonList, IonToggle, IonItem, IonRange, IonButton, IonContent, IonTitle, IonToolbar, IonHeader, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { happyOutline, sadOutline } from 'ionicons/icons'; // Import ionicons
import { ConfigService } from '../config.service';
import { ConfigData, Variable } from '../config';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../indexed-db.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  imports: [IonSegment, IonSegmentButton, IonIcon, IonList, IonToggle, IonItem, IonRange, IonLabel, IonButton, IonContent, IonTitle, IonToolbar, IonHeader, FormsModule, CommonModule],
  standalone: true
})
export class LogSleepPage {
  sleepQuality: string;
  happyOutline = happyOutline;
  sadOutline = sadOutline;
  variables: Variable[] = [];
  hasLogToday!: boolean;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private indexedDbService: IndexedDbService
  ) {
    this.sleepQuality = 'great';
    this.loadVariables();
    this.checkIfLogForTodayExists()
  }
  async checkIfLogForTodayExists() {
    this.hasLogToday = await this.indexedDbService.hasLogForToday();
  }

  async loadVariables() {
    try {
      await this.configService.loadConfig();
      if (this.configService.ConfigData && this.configService.ConfigData.variables) {
        this.variables = this.configService.ConfigData.variables.map(variable => {
          if (variable.type === 'bool') {
            variable.value = false;
          } else if (variable.type === 'range') {
            variable.value = 0;
          }
          return variable;
        });
      }
    } catch (error) {
      console.error('Error loading variables:', error);
    }
  }

  async submit() {
    const entry: any = {
      date: new Date().toISOString(), // Today's date
      sleepQuality: this.sleepQuality,
      variables: this.variables
    };

    try {
      await this.indexedDbService.addEntry(entry);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error saving data to IndexedDB:', error);
    }
  }

}
