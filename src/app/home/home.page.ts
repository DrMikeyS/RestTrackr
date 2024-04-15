import { Component } from '@angular/core';
import { IonButton, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class HomePage {
  constructor(private router: Router,
    private indexedDbService: IndexedDbService) { }

  logSleep() {
    this.router.navigate(['/log-sleep']);
  }

  viewResults() {
    this.router.navigate(['/view-results']);
  }

  deleteAll() {
    this.indexedDbService.deleteAllEntries()
  }
}
