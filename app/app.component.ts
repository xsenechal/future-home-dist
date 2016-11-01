import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Injectable }     from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class Place {
  name: string;
}

const FROM_PLACE: Place = { name: 'Versailles' };
const TO_PLACES: Place[] = [
  { name: 'Saint-germain-en-laye' },
  { name: 'Paris opéra' }
];


@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <h2>From: {{fromPlace.name}}</h2>
    <h2>To:</h2>
    <ul>
      <li *ngFor="let p of toPlaces">
        <span class="badge">{{p.name}}</span>
      </li>
    </ul>
    <input type="button" value="process" (click)="process()">

    <sebm-google-map [latitude]="lat" [longitude]="lng">
      <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
    </sebm-google-map>
  `,
  styleUrls: ['app/app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'Distances for future home';
  fromPlace = FROM_PLACE;
  toPlaces = TO_PLACES;
  result = '';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor (private http: Http) {}

  //gapiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA';
  gapiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR';
  processGet(): void {
    console.log("Start http request...");
    this.http
      .get(this.gapiUrl)
      .toPromise()
      .then(res => {
        this.result = res.json();
        console.log("received result :", this.result);
      });
  }
  process(): void {
    console.log("Start gmaps v3 request...");
    var service = new google.maps.DistanceMatrixService;
    var origin1 = {lat: 55.93, lng: -3.118};
    var origin2 = 'Greenwich, England';
    var destinationA = 'Stockholm, Sweden';
    var destinationB = {lat: 50.087, lng: 14.421};

    service.getDistanceMatrix({
      origins: [this.fromPlace.name],
      destinations: [this.toPlaces[0].name, this.toPlaces[1].name],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        console.log("response:", response);
      }
    });


  }
}

