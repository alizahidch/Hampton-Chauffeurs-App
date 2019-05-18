import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatCardModule} from '@angular/material';

import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
 
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { ConnectivityServiceService } from './services/connectivity-service.service';
import { GoogleMapsService } from './services/google-maps.service';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';

const firebaseConfig = {
  apiKey: "AIzaSyAFaAEdFIiN4rg32ailrjTQi25qB0u_PHI",
  authDomain: "hampton-chaffeurs.firebaseapp.com",
  databaseURL: "https://hampton-chaffeurs.firebaseio.com",
  projectId: "hampton-chaffeurs",
  storageBucket: "hampton-chaffeurs.appspot.com",
  messagingSenderId: "660237080040",
  appId: "1:660237080040:web:ec9c1f6c58d1e5d5"
};




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AgmCoreModule.forRoot({
    apiKey: "AIzaSyAYCDvDJYdHYAArV3XBlKTkDoyY4UHARTQ",
    libraries: ["places"]
}),AngularFireDatabaseModule,AppRoutingModule,BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,MatCardModule],
  providers: [
    StatusBar,
    ConnectivityServiceService,
    GoogleMapsService,
    Network,
    Geolocation,
    NativeGeocoder,
    AuthenticationService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
