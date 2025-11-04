import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  
  showForm = false;

  newHotel: any = {}; // holds hotel form data
  hotels: any[] = []; // stores loaded hotels list

  // list of room types for the new hotel
  roomTypes: any[] = [{
    roomTypeName: '',
    price: null,
    numberOfRooms: null,
    maxAdults: null
  }]; 

  constructor(private router: Router, private hotelService: HotelService) {}


  //Methods

  toggleForm() {
    this.showForm = !this.showForm;

    // Reset form when closed
    if (!this.showForm) {
      this.newHotel = {};
      this.roomTypes = [{
        roomTypeName: '',
        price: null,
        numberOfRooms: null,
        maxAdults: null
      }];
    }
  }

  ngOnInit() {
    this.loadHotels();  // load hotels on startup
  }

  loadHotels() {
    // Fetch hotels from backend
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
  }

  // Add new room type input fields
  addRoomType() {
    this.roomTypes.push({
      roomTypeName: '',
      price: 0,
      numberOfRooms: 0,
      maxAdults: 0
    });
  }

  // Remove specific room type input
  removeRoomType(index: number) {
    this.roomTypes.splice(index, 1);
  }

  //adds new hotel with its room types
  submitForm() {
  const newHotelWithRoomTypes = {
    hotelName: this.newHotel.hotelName,
    location: this.newHotel.location,
    roomTypes: this.roomTypes
  };

  // Call the service to add the new hotel with room types
  this.hotelService.addHotel(newHotelWithRoomTypes).subscribe(
    (addedHotel) => {

      console.log('Hotel added:', addedHotel);

      // Reset form values
      this.newHotel = {
        hotelName: '',
        location: ''
      };
      this.roomTypes = [];
      this.showForm = false;

      // Reload hotels
      this.loadHotels();
    },
    (error) => {
      console.error('Error adding hotel:', error);
    }
  );
    alert('Hotel added successfully');

  }

  // Navigate to hotel details page using hotelId
  navigateToHotelDetails(hotel: any) {
    if (hotel && hotel.hotelId) {
      const hotelId = hotel.hotelId;
      this.router.navigate(['/hotel-details', hotelId]);
    } else {
      console.error('Hotel object does not have a valid hotelId property:', hotel);
    }
  }
  
}
