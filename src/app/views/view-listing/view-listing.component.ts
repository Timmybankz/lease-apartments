import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { Feature } from 'src/app/store/models/listings.model';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.scss']
})
export class ViewListingComponent implements OnInit {

  listing: Feature;

  constructor(
    private mapServ: MapService,
    private route: ActivatedRoute
  ) { }

  goToListings() {
    this.mapServ.goToListings();
    window.history.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
        const listingId = paramMap.get('listingId') || '';
        if (!listingId) {
          window.history.back()
          return;
        }
        this.listing = this.mapServ.getSingleListing(parseInt(listingId));
        if (!this.listing.type) {
          window.history.back()
          return;
        }
    });
  }

}
