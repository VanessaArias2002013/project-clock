// clock.page.ts
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
  currentTime: string = '';

  // Usado para desuscribirse automáticamente cuando el componente se destruye
  private onDestroy$ = new Subject<void>();

  constructor(private clockService: ClockService) {}

  ngOnInit() {
    this.updateTime();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  updateTime() {
    setInterval(() => {
      // Llama al servicio para obtener la hora actual
      this.clockService.getCurrentTime().subscribe(
        (data: any) => {
          // Formatea la fecha y hora utilizando Moment.js
          this.currentTime = moment(data.serverTime).format('hh:mm:ss A');
        },
        (error) => {
          console.error('Error fetching time:', error);
        }
      );
    }, 1000); // Actualiza cada segundo
  }
}
