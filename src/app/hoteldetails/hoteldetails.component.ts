import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel/hotel.service';
import { RoomtypeService } from '../services/roomtype/roomtype.service';

@Component({
  selector: 'app-hoteldetails',
  templateUrl: './hoteldetails.component.html',
  styleUrls: ['./hoteldetails.component.css']
})
export class HoteldetailsComponent {
  hotelId: number = 0;
  hotels: any = {};
  roomTypes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomtypeService: RoomtypeService,
  ) {}

  newRoomType: any = {
    roomTypeName: '',
    price: null,
    maxAdults: null,
    numberOfRooms: null
  };


  showAddRoomTypeForm: boolean = false;


  //Methods

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = +params['hotelId'];
      this.loadHotel();
      this.loadRoomTypes();
    });
  }

  loadHotel() {
    this.hotelService.getHotelById(this.hotelId).subscribe(
      (hotels) => {
        this.hotels = hotels;
        this.newRoomType.hotelId = this.hotelId;
      },
      (error) => {
        console.error('Error loading hotel details:', error);
      }
    );
  }

  loadRoomTypes() {
    this.roomtypeService.getRoomTypesByHotelId(this.hotelId).subscribe(
      (roomTypes) => {
        this.roomTypes = roomTypes;
      },
      (error) => {
        console.error('Error loading room types:', error);
      }
    );
  }

  editRoomType(roomType: any) {
    this.roomTypes.forEach(rt => (rt.isEditing = false));

    roomType.isEditing = true;
    roomType.editedRoomTypeId = roomType.roomTypeId;
  }


  updateRoomType(roomTypeId:number, roomType: any) {
    this.roomtypeService.updateRoomType(roomTypeId,roomType).subscribe(
      (result) => {
        if (result) {
          console.log('Room type updated successfully');
          roomType.isEditing = false;
          this.loadRoomTypes();
        } else {
          console.error('Error updating room type');
        }
      },
      (error) => {
        console.error('Error updating room type:', error);
      }
    );
    alert('Room Type saved successfully');
  }

  cancelEdit(roomType: any) {
    roomType.isEditing = false;
    this.loadRoomTypes();
  }

  deleteRoomType(roomTypeId: number) {
    this.roomtypeService.deleteRoomType(roomTypeId).subscribe(
      (result) => {
        if (result) {
          
          console.log('Room type deleted successfully');
          this.loadRoomTypes();
        } else {
          console.error('Error deleting room type');
        }
      },
      (error) => {
        console.error('Error deleting room type:', error);
      }
    );
    alert('Room Type deleted successfully');
  }
  
  ToogleRoomType() {
    this.showAddRoomTypeForm = !this.showAddRoomTypeForm;
  }
  
  submitNewRoomType() {

    // Call the service to add the new room type
    this.roomtypeService.addRoomType(this.newRoomType).subscribe(
      (result) => {
        if (result) {
          console.log('Room type added successfully');
          this.loadRoomTypes();
          this.ToogleRoomType();
        } else {
          console.error('Error adding room type');
        }
      },
      (error) => {
        console.error('Error adding room type:', error);
      }
    );
    alert('Room Type saved successfully');
  }
  

}
