import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {
  private baseUrl = 'http://localhost:8080/suntravels/roomtype';

  constructor(private http: HttpClient) { }

  // Add new room type
  addRoomType(roomtype: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveRoomType`, roomtype);
  }

  // Get all room types by hotel ID
  getRoomTypesByHotelId(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRoomTypesByHotelId/${hotelId}`);
  }

  // Update existing room type
  updateRoomType(roomTypeId: number, roomType: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateRoomTypeById/${roomTypeId}`, roomType);
  }

  // Delete room type by ID
  deleteRoomType(roomTypeId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteRoomTypeById/${roomTypeId}`);
  }
}
