import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { Feature, Listing } from '../../store/models/listings.model';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.component.html',
  styleUrls: ['./all-listings.component.scss']
})
export class AllListingsComponent implements OnInit {

  listings: Listing;
  listings$: Observable<Listing>;
 
  constructor(
    private store: Store<{ listing: Listing }>,
    private mapServ: MapService,
    private router: Router
  ) {
    this.listings$ = store.select('listing');
  }

  zoomToPlace(listing: Feature) {
    this.mapServ.flyToListing(listing);
    this.mapServ.createPopUp(listing);
    this.router.navigate([`listings/single/${listing.properties.listingId}`]);
  }

  ngOnInit(): void {
    this.listings$.subscribe(
      (data) => {
        this.listings = data;
      }, (err) => {
      });
  }

}
