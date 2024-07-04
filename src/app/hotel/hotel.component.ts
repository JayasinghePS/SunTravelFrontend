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

  newHotel: any = {};
  hotels: any[] = [];
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
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
  }

  addRoomType() {
    this.roomTypes.push({
      roomTypeName: '',
      price: 0,
      numberOfRooms: 0,
      maxAdults: 0
    });
  }

  removeRoomType(index: number) {
    this.roomTypes.splice(index, 1);
  }

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


  navigateToHotelDetails(hotel: any) {
    if (hotel && hotel.hotelId) {
      const hotelId = hotel.hotelId;
      this.router.navigate(['/hotel-details', hotelId]);
    } else {
      console.error('Hotel object does not have a valid hotelId property:', hotel);
    }
  }
  
}
