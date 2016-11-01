import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { AppComponent }  from './app.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxrc-3Uzlb69Mf5V9ZDDDF9rQ7aqydQ7k'
    })
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
