"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var core_2 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var Place = (function () {
    function Place() {
    }
    return Place;
}());
exports.Place = Place;
var FROM_PLACE = { name: 'Versailles' };
var TO_PLACES = [
    { name: 'Saint-germain-en-laye' },
    { name: 'Paris opéra' }
];
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = 'Distances for future home';
        this.fromPlace = FROM_PLACE;
        this.toPlaces = TO_PLACES;
        this.result = '';
        this.lat = 51.678418;
        this.lng = 7.809007;
        //gapiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA';
        this.gapiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR';
    }
    AppComponent.prototype.processGet = function () {
        var _this = this;
        console.log("Start http request...");
        this.http
            .get(this.gapiUrl)
            .toPromise()
            .then(function (res) {
            _this.result = res.json();
            console.log("received result :", _this.result);
        });
    };
    AppComponent.prototype.process = function () {
        console.log("Start gmaps v3 request...");
        var service = new google.maps.DistanceMatrixService;
        var origin1 = { lat: 55.93, lng: -3.118 };
        var origin2 = 'Greenwich, England';
        var destinationA = 'Stockholm, Sweden';
        var destinationB = { lat: 50.087, lng: 14.421 };
        service.getDistanceMatrix({
            origins: [this.fromPlace.name],
            destinations: [this.toPlaces[0].name, this.toPlaces[1].name],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            }
            else {
                console.log("response:", response);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <h2>From: {{fromPlace.name}}</h2>\n    <h2>To:</h2>\n    <ul>\n      <li *ngFor=\"let p of toPlaces\">\n        <span class=\"badge\">{{p.name}}</span>\n      </li>\n    </ul>\n    <input type=\"button\" value=\"process\" (click)=\"process()\">\n\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\">\n      <sebm-google-map-marker [latitude]=\"lat\" [longitude]=\"lng\"></sebm-google-map-marker>\n    </sebm-google-map>\n  ",
            styleUrls: ['app/app.component.css']
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map