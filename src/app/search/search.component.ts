import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  checkInDate: string = '';  // check-in date input
  numNights: number = 1;    // number of nights stay

  // dynamic list of guest objects
  guests: { numAdults: number, numRooms: number }[] = [{ numAdults: 1, numRooms: 1 }];

  searchResults: any[] = [];  // stores API results
  showSearchBar: boolean = true;  // toggles form visibility

  constructor(private router: Router, private searchService: SearchService) {}

  
  //Methods

  // add new guest input block
  addGuest() {
    this.guests.push({ numAdults: 1, numRooms: 1 });
  }

  // remove a specific guest block
  removeGuest(index: number) {
    this.guests.splice(index, 1);
  }

  // perform search
  search() {
    
  const currentDate = new Date();
  const inputDate = new Date(this.checkInDate);

  // simple date validation (check whether input after current date)
  if (isNaN(inputDate.getTime()) || inputDate < currentDate) {
    alert('Invalid check-in date. Please select a valid date.');
    return;
  }

    // prepare request payload
    const requestBody = {
      checkInDate: this.checkInDate,
      numberOfNights: this.numNights,
      numberOfRooms: this.guests.map(guest => guest.numRooms),
      numberOfAdults: this.guests.map(guest => guest.numAdults)
    };

    // call backend API via search service
    this.searchService.search(requestBody)
      .subscribe(data => {
        console.log('Search results:', data);
        this.searchResults = data;
        this.showSearchBar = false;   // hide form after search

        if (this.searchResults.length === 0) {
          alert('No results found. Please refresh the page.');
        }
      }, error => {
        console.error('Error occurred:', error);
      });
  }
}
