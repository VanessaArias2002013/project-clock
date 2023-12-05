import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private apiUrl1 = 'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Ciudad_Juarez';
  private apiUrl2 = 'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Mexico_City';
  private apiUrl3 = 'https://api.ipgeolocation.io/timezone?apiKey=80e6beb5bfb04f419c1a503e83b2a668&tz=America/Cancun';

  constructor(private http: HttpClient) {}

  getCurrentTime(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }
}
