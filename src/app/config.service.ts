import { Injectable } from '@angular/core';
import * as yaml from 'js-yaml';
import { ConfigData, Variable } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  ConfigData: ConfigData | null = null;

  constructor() {
    this.loadConfig();
  }

  loadConfig(): Promise<void> {
    return fetch('assets/config.yaml')
      .then((response) => response.text())
      .then((data) => {
        this.ConfigData = yaml.load(data) as ConfigData;
      });
  }
}
