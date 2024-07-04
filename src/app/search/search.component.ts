import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  checkInDate: string = '';
  numNights: number = 1;
  guests: { numAdults: number, numRooms: number }[] = [{ numAdults: 1, numRooms: 1 }];
  searchResults: any[] = [];

  showSearchBar: boolean = true;

  constructor(private router: Router, private searchService: SearchService) {}

  
  //Methods

  addGuest() {
    this.guests.push({ numAdults: 1, numRooms: 1 });
  }

  removeGuest(index: number) {
    this.guests.splice(index, 1);
  }

  search() {
    
  const currentDate = new Date();
  const inputDate = new Date(this.checkInDate);

  if (isNaN(inputDate.getTime()) || inputDate < currentDate) {
    alert('Invalid check-in date. Please select a valid date.');
    return;
  }

    const requestBody = {
      checkInDate: this.checkInDate,
      numberOfNights: this.numNights,
      numberOfRooms: this.guests.map(guest => guest.numRooms),
      numberOfAdults: this.guests.map(guest => guest.numAdults)
    };

    this.searchService.search(requestBody)
      .subscribe(data => {
        console.log('Search results:', data);
        this.searchResults = data;
        this.showSearchBar = false;

        if (this.searchResults.length === 0) {
          alert('No results found. Please refresh the page.');
        }
      }, error => {
        console.error('Error occurred:', error);
      });
  }
}
