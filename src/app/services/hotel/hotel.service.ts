import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://localhost:8080/suntravels/hotel';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getHotels`);
  }

  getHotelById(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getHotelById/${hotelId}`);
  }


  addHotel(hotel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveHotelWithRoomTypes`, hotel);
  }

  updateHotel(hotelId: number, hotel: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateHotelById/${hotelId}`, hotel);
  }

  deleteHotel(hotelId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteHotelById/${hotelId}`);
  }

}
