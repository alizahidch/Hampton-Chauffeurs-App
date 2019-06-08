import { Component, OnInit,NgZone,ViewChild,ElementRef } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {FormControl} from "@angular/forms";
import { MapsAPILoader } from '@agm/core';

import { AgmCoreModule } from "@agm/core";
import {ApiService} from '../../services/api.service'
import { ToastController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-oneway',
  templateUrl: './oneway.page.html',
  styleUrls: ['./oneway.page.scss'],
})
export class OnewayPage implements OnInit {
  labelOptions = {
    color: '#CC0000',
   
    }

address;

public latitude: number;
public longitude: number;
public tolatitude: number;
public tolongitude: number;
public searchControl: FormControl;
public zoom: number;
userid;
fromLocation;
  @ViewChild('from') fromAdress : ElementRef;

  @ViewChild('to') toAdress : ElementRef;

  private todo : FormGroup;
  myTime: String = new Date().toTimeString();
  constructor(private router:NavController,private formBuilder: FormBuilder,public alertController: AlertController,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private api:ApiService,public toastController: ToastController) {

    this.todo = this.formBuilder.group({
      from: ['', Validators.required],
  to:['', Validators.required],
      date:[''],
      time:[''],
     class:[''],
     instructions:['']
    });


    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
   }

  ngOnInit() {
    this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let nativeHomeInputBox = this.fromAdress.nativeElement as HTMLInputElement;
      let toHomeInputBox=this.toAdress.nativeElement as HTMLInputElement;
          // let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0] as HTMLInputElement;
          this.autoComplete(nativeHomeInputBox);
          this.toAutoComplete(toHomeInputBox)
      });
  
  }

  toAutoComplete(inputcred){
    let autocomplete = new google.maps.places.Autocomplete(inputcred, {
      types: ["geocode"]
  });
  autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
              return;
          }

          //set latitude, longitude and zoom
          this.tolatitude = place.geometry.location.lat();
          this.tolongitude = place.geometry.location.lng();
          console.log(this.tolongitude);
          console.log(this.tolatitude);
          this.fromLocation=place.formatted_address;
          this.zoom = 12;
      });
  });

  }

  autoComplete(inputcred){
    let autocomplete = new google.maps.places.Autocomplete(inputcred, {
      types: ["geocode"]
  });
  autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
              return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.longitude);
          console.log(this.latitude);
          this.fromLocation=place.formatted_address;
          this.zoom = 12;
      });
  });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
    }
}
onDrag(){
  console.log("Drag ended")
}

BookNow()
{
  this.calculateDistance();
}
calculateDistance() {
  console.log("Distance function started")
  const start = new google.maps.LatLng(this.latitude, this.longitude);
  const end = new google.maps.LatLng(this.tolatitude, this.tolongitude);
  const distance = google.maps.geometry.spherical.computeDistanceBetween(start, end);
  console.log(distance/1000);
}
  GoBack(){
    this.router.navigateBack('/booking');
    
  }

}
