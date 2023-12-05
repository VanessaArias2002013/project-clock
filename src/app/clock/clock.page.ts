import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from '../services/clock.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.page.html',
  styleUrls: ['./clock.page.scss'],
})
export class ClockPage implements OnInit, OnDestroy {
  currentTimes: string[] = ['', '', '']; // Array para almacenar las tres horas

  private apiUrls = [
    'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Ciudad_Juarez',
    'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Mexico_City',
    'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Cancun',
  ];

  private onDestroy$ = new Subject<void>();

  constructor(private clockService: ClockService) {}

  ngOnInit() {
    this.updateTimes();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  updateTimes() {
    setInterval(() => {
      this.apiUrls.forEach((apiUrl, index) => {
        this.clockService.getCurrentTime(apiUrl).subscribe(
          (data: any) => {
            const serverTime = moment(data.serverTime);

            if (index === 1) {
              // Restar 3 horas solo para currentTimes[1]
              serverTime.subtract(3, 'hours');
            } else if (index === 2) {
              // Restar 1 hora solo para currentTimes[2]
              serverTime.subtract(1, 'hours');
            }

            // Formatear la fecha y hora utilizando Moment.js
            this.currentTimes[index] = serverTime.format('hh:mm:ss A');
          },
          (error) => {
            console.error(`Error fetching time from ${apiUrl}:`, error);
          }
        );
      });
    }, 1000); // Actualiza cada segundo
  }
}
