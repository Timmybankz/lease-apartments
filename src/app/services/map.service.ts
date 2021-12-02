import { Injectable, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Store } from '@ngrx/store';
import { Feature, Listing } from 'src/app/store/models/listings.model';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapService {
  
    listings$: Observable<Listing>;
    subscription: Subscription;

    map: mapboxgl.Map;
    // style = 'mapbox://styles/mapbox/streets-v11';
    style = 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
    lat = 38.910525;
    lng = -77.043929;
    zoom = 10;

    constructor(
      private store: Store<{ listing: Listing }>
    ) {
      this.listings$ = store.select('listing');
    }

    getSingleListing(listingId: number): Feature {
      let listing: Feature = {} as Feature;
      this.subscription = this.listings$.subscribe(
        (data) => {
          listing = (data.features.find(obj => obj.properties.listingId === listingId) || {} as Feature );
        }, 
        (err) => {});
      this.subscription.unsubscribe();
      return listing;
    }

    buildMap(passedListings: any) {
        this.map = new mapboxgl.Map({
            accessToken: environment.mapbox.accessToken,
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.lng, this.lat]
        });
        this.map.addControl(new mapboxgl.NavigationControl());

        // Create a default Marker and add it to the map.
        new mapboxgl.Marker()
          .setLngLat([12.554729, 55.70651])
          .addTo(this.map);
            
        // Create a default Marker, colored black, rotated 45 degrees.
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([12.49147, 55.708166])
          .addTo(this.map);

        this.map.on('load', (e) => {
          this.addLayer(passedListings);
        });
    }

    goToListings() {
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();

      this.map.flyTo({
        center: [this.lng, this.lat],
        zoom: this.zoom
      });
    }

    addLayer(passedListings: any) {

      this.map.addSource('places', {
        type: 'geojson',
        data: passedListings
      });

      /* Create a marker for each store */
      passedListings.features.forEach((listing: any, index: number) => {

        /** Create a marker and add it to the map. **/
        const marker = new mapboxgl.Marker({ color: 'red', offset: [0, 23] })
          .setLngLat(listing.geometry.coordinates)
          .addTo(this.map);

        marker.getElement().addEventListener('click', () => {
          /* Fly to the point */
          this.flyToListing(listing);
          /* Close all other popups and display popup for clicked store */
          this.createPopUp(listing);
        });
      });
    }

    flyToListing(currentFeature: any) {
      this.map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      });
    }

    createPopUp(currentFeature: any) {

      var popUps = document.getElementsByClassName('mapboxgl-popup');
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();
    
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>Listing #${currentFeature.properties.listingId}</h3>` +
          '<h4>' + currentFeature.properties.address + '</h4>')
        .addTo(this.map);
    }

    onMapClick(point: any) {
      let features = this.map.queryRenderedFeatures(point, {
        layers: ['locations']
      });
      /* If yes, then: */
      if (features.length) {
        var clickedPoint = features[0];
        
        /* Fly to the point */
        this.flyToListing(clickedPoint);
        
        /* Close all other popups and display popup for clicked store */
        this.createPopUp(clickedPoint);
      }
    }

}
