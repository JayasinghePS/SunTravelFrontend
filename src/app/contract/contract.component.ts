import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract/contract.service';
import { HotelService } from '../services/hotel/hotel.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit{
  showForm = false;

  editedContract: any = {
    contractId: null,
    startDate: null,
    endDate: null,
    markupPercentage: null,
    hotelId: null,
  };

  newContract: any = {
    startDate: null,
    endDate: null,
    hotelId: null,
    hotelName: null,
    markupPercentage: null,
  };

  contracts: any[] = [];
  hotels: any[] = [];

  minStartDate!: string;
  minEndDate!: string; 

constructor(private contractService: ContractService, private hotelService: HotelService) {}


//Methods

toggleForm() {
    this.showForm = !this.showForm;
}

ngOnInit() {
    this.loadContracts();
    this.loadHotels();

    const currentDate = new Date();
    this.minStartDate = this.formatDate(currentDate);
    this.minEndDate = this.formatDate(currentDate);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

loadHotels() {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
}

loadContracts() {
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
    });
}

getHotelName(hotelId: number): string {
    const hotel = this.hotels.find(h => h.hotelId === hotelId);
    return hotel ? hotel.hotelName : 'Unknown';
}
  

submitForm() {
  this.newContract.hotelId = parseInt(this.newContract.hotelId, 10);
  this.editedContract.hotelId = parseInt(this.editedContract.hotelId, 10);

  // Check if start date is in the present or future
  if (new Date(this.newContract.startDate) < new Date()) {
    alert('Start date cannot be a past date');
    return;
  }

  // Check if end date is in the future
  if (new Date(this.newContract.endDate) <= new Date()) {
    alert('End date must be in the future');
    return;
  }

  // Check whether the End date is comes after end date
  if (new Date(this.newContract.endDate) <= new Date(this.newContract.startDate)) {
    alert('End date must be a date after the start date');
    return;
  }

  if (this.editedContract.contractId) {
    this.contractService.updateContract(this.editedContract.contractId, this.editedContract)
      .subscribe(
        () => {
          this.loadContracts(); // Reload contracts after updating
          this.closeEditForm(); // Close the edit form or modal
          alert('Contract saved successfully');
        },
        (error) => {
          if (error.status === 400) {
            alert('Bad request: ' + error.error); // Display the bad request message
          } else {
            alert('Error saving contract');
          }
        }
      );
  } else {

    // Adding new contract
    this.contractService.addContract(this.newContract)
      .subscribe(
        () => {
          this.loadContracts(); // Reload contracts after adding a new one
          this.newContract = {
            startDate: null,
            endDate: null,
            markupPercentage: null,
            hotelId: null,
          };
          this.showForm = false;
          alert('Contract added successfully');
        },
        (error) => {
          if (error.status === 400) {
            alert('Bad request: ' + error.error); // Display the bad request message
          } else {
            alert('Error adding contract');
          }
        }
      );
  }
}


editContract(contract: any) {
    this.editedContract = { ...contract };
    console.log('Editing Contract:', contract);
    console.log('Edited Contract:', this.editedContract);
}
  

closeEditForm() {
    this.editedContract = {
      contractId: null,
      startDate: null,
      endDate: null,
      markupPercentage: null,
      hotelId: null,
    };
}

deleteContract(contract: any) {
    const index = this.contracts.indexOf(contract);
    if (index !== -1) {
      this.contractService.deleteContract(contract.contractId).subscribe(() => {
        this.contracts.splice(index, 1);
      });
      alert('Contract deleted successfully');
    }
}
  
}
