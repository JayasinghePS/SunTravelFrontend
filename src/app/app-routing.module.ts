import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContractComponent } from './contract/contract.component';
import { HotelComponent } from './hotel/hotel.component';
import { HoteldetailsComponent } from './hoteldetails/hoteldetails.component'; 
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contract-page', component: ContractComponent },
  { path: 'hotel-page', component: HotelComponent },
  { path: 'search-page', component: SearchComponent },
  { path: 'hotel-details/:hotelId', component: HoteldetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
