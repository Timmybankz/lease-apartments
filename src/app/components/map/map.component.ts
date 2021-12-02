import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Listing } from '../../store/models/listings.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {

  listings$: Observable<Listing>;
  subscription: Subscription;

  constructor(
    private map: MapService,
    private store: Store<{ listing: Listing }>
  ) {
    this.listings$ = store.select('listing');
  }

  ngOnInit() {
    this.subscription = this.listings$.subscribe(
      (data) => {
        this.map.buildMap(data);
      }, 
      (err) => {});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
