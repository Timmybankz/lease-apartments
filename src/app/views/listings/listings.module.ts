import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';
import { ListingsComponent } from './listings.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { AmountFormatterModule } from 'src/app/pipes/amount-formatter.module';
import { AllListingsComponent } from '../all-listings/all-listings.component';
import { ViewListingComponent } from '../view-listing/view-listing.component';


const routes: Routes = [
  {
    path: '',
    component: ListingsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllListingsComponent },
      { path: 'single/:listingId', component: ViewListingComponent },
      { path: '**', redirectTo: 'all' }
    ]
  }
];

@NgModule({
  declarations: [
    ListingsComponent,
    MapComponent,
    AllListingsComponent,
    ViewListingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AmountFormatterModule,
    RouterModule.forChild(routes)
  ]
})
export class ListingsModule { }
