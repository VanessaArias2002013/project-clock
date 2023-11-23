import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importa catchError

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private apiUrl = 'https://api.ipgeolocation.io/timezone?apiKey=239163d3eb73484d8ab90b0139f184b0&tz=America/Cancun';

    // Constructor que inyecta el servicio HttpClient
  constructor(private http: HttpClient) {}

    // Método para obtener la hora actual
 
    getCurrentTime(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  }
