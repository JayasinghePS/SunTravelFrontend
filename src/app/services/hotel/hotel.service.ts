import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'    // available for entire app
})
export class HotelService {
  private baseUrl = 'http://localhost:8080/suntravels/hotel';

  constructor(private http: HttpClient) {}    //HttpClient → used to call backend APIs

  // Get all hotels
  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getHotels`);
  }

  // Get single hotel by its ID
  getHotelById(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getHotelById/${hotelId}`);
  }

  // Add a new hotel (with room types)
  addHotel(hotel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveHotelWithRoomTypes`, hotel);
  }

  // Update hotel by ID
  updateHotel(hotelId: number, hotel: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateHotelById/${hotelId}`, hotel);
  }

  // Delete hotel by ID
  deleteHotel(hotelId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteHotelById/${hotelId}`);
  }

}
