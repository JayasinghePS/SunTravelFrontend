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
  hotelId: number = 0; // current hotel’s ID from URL
  hotels: any = {}; // stores selected hotel data
  roomTypes: any[] = [];  // stores all room types for this hotel

  constructor(
    private route: ActivatedRoute,  // to access route params
    private hotelService: HotelService, // to fetch hotel data
    private roomtypeService: RoomtypeService, // to manage room types
  ) {}

  // holds new room type form data
  newRoomType: any = {
    roomTypeName: '',
    price: null,
    maxAdults: null,
    numberOfRooms: null
  };

  // controls add form visibility
  showAddRoomTypeForm: boolean = false;


  //Methods

  // runs when component loads
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = +params['hotelId'];  // extract hotelId from URL
      this.loadHotel();                   // load hotel details
      this.loadRoomTypes();               // load its room types
    });
  }

  // fetch hotel by ID
  loadHotel() {
    this.hotelService.getHotelById(this.hotelId).subscribe(
      (hotels) => {
        this.hotels = hotels;
        this.newRoomType.hotelId = this.hotelId;    // link new room type to hotel
      },
      (error) => {
        console.error('Error loading hotel details:', error);
      }
    );
  }

  // fetch all room types for the selected hotel
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

  // enable edit mode for a selected room type
  editRoomType(roomType: any) {
    this.roomTypes.forEach(rt => (rt.isEditing = false));   // close others

    roomType.isEditing = true;
    roomType.editedRoomTypeId = roomType.roomTypeId;
  }

  // update room type details
  updateRoomType(roomTypeId:number, roomType: any) {
    this.roomtypeService.updateRoomType(roomTypeId,roomType).subscribe(
      (result) => {
        if (result) {
          console.log('Room type updated successfully');
          roomType.isEditing = false;
          this.loadRoomTypes();   // refresh list
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

  // cancel editing and reload data
  cancelEdit(roomType: any) {
    roomType.isEditing = false;
    this.loadRoomTypes();
  }

  // delete a room type
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
  
  // toggle add form open/close
  ToogleRoomType() {
    this.showAddRoomTypeForm = !this.showAddRoomTypeForm;
  }
  
  // add new room type
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
