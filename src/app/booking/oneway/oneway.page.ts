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
public miles:number;
economyBill:any=0;
businessBill:any=0;
totalBill:any=0;
economyRate:any=60;
businessRate:any=110;
userid;
fromLocation;
toLocation;
  @ViewChild('from') fromAdress : ElementRef;

  @ViewChild('to') toAdress : ElementRef;

  private todo : FormGroup;
  myTime: String = new Date().toTimeString();


classes=[
  {name:"Business", isChecked: false},
{name:"Economy", isChecked: false},
]
  constructor(private router:NavController,private formBuilder: FormBuilder,public alertController: AlertController,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private api:ApiService,public toastController: ToastController) {
this.userid=this.api.userid;
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
          this.toLocation=place.formatted_address;
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

async presentAlertConfirm(bill,cls,dat,ml,loc,lat,lon) {
  let bl=bill;
  let cl=cls;
  let dt=dat;
  let m=ml;
let uid=this.userid;
  let msg='Dear Customer your trip details are below <br> <hr> Bill :<strong>'+bl+'</strong>$'+'<br> <hr> Class:'+cls+'<br> <hr> Date:'+dat+'<br> <hr> Mileage:'+ml+'hours <br> <hr> ' +'<br> <hr> Location:'+this.fromLocation+'<br> <hr To:>'+this.toLocation+'<br> <hr> Lat:'+lat+'<br> <hr> Lon:'+lon;
  const alert = await this.alertController.create({
    header: 'Booking Request!',
    message: msg,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          this.classes=[
          {name:"Business", isChecked: false},
{name:"Economy", isChecked: false}];
this.economyBill=0;
this.businessBill=0;
this.totalBill=0
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          let booking={
            'bookedby':uid,
            'type':'oneway',
            'estimated-fare':bill,
            'pickup':this.toLocation,
            'pickup-coords':lat+','+lon,
            'status':'pending',
            'class':cls,
            'date':dat,
            'mileage':ml,
            'instructions':this.todo.value.instructions

          }
          this.api.oneWayBooking(booking).then(res=>{
           let bid=res.key;
           this.api.userUpdate(bid);
            this.presentToast();
            this.router.navigateBack('/booking');
          })
        }
      }
    ]
  });

  await alert.present();
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Your booking request has been sent.',
    duration: 3000,
    color:"success",
    animated:true

  });
  toast.present();
  

}







 
BookNow()
{
  this.calculateDistance();
  this.fromLocation;
  this.classes=this.classes.filter(res=>{
 
    return res.isChecked;
  })
  this.classes.forEach(element=>{
  this.todo.value.class=element.name
  })
  if(this.todo.value.class=="Economy"){
this.economyBill=this.economyRate*this.miles;

  }
  else
  {
    this.businessBill=this.businessRate*this.miles

  }


  this.totalBill=this.businessBill+this.economyBill
  console.log(this.totalBill)

  this.presentAlertConfirm(this.totalBill,this.todo.value.class,this.todo.value.date,this.miles,this.todo.value.from,this.latitude,this.longitude)

}
calculateDistance() {
  console.log("Distance function started")
  const start = new google.maps.LatLng(this.latitude, this.longitude);
  const end = new google.maps.LatLng(this.tolatitude, this.tolongitude);
  const distance = google.maps.geometry.spherical.computeDistanceBetween(start, end);
 
  this.miles=distance/1000;
}
  GoBack(){
    this.router.navigateBack('/booking');
    
  }

}
