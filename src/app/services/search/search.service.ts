import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8080/suntravels';

  constructor(private http: HttpClient) {}

  search(requestBody: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/search`, requestBody);
  }
}
