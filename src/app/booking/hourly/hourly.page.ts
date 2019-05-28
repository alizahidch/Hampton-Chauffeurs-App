import { Component,NgZone, OnInit,ViewChild ,ElementRef} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController,AlertController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import {FormControl} from "@angular/forms";
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {ApiService} from '../../services/api.service'
import { ToastController } from '@ionic/angular';

// var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.page.html',
  styleUrls: ['./hourly.page.scss'],
})
export class HourlyPage implements OnInit {
address;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  userid;
  fromLocation;

  @ViewChild("search")
  public searchElementRef;

  
  
txtHome:HTMLInputElement;
//Map settings
map: mapboxgl.Map;
@ViewChild('map') mapInput:any;

@ViewChild('searchTextField') input : ElementRef;


geocodingClient=mapboxgl.places;
style = 'mapbox://styles/mapbox/outdoors-v9';
lat = 40.963432;
lng = -72.184799;
message = 'Hello World!';



  time=[
    2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
  ]
  private todo : FormGroup;
  myTime: String = new Date().toTimeString();
economyBill:any=0;
businessBill:any=0;
totalBill:any=0;
economyRate:any=50;
businessRate:any=100;



classes=[
  {name:"Business", isChecked: false},
{name:"Economy", isChecked: false},
]



  constructor(private formBuilder: FormBuilder,private router:NavController,public alertController: AlertController, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private api:ApiService,public toastController: ToastController) { 
      this.userid=this.api.userid;
    this.todo = this.formBuilder.group({
      from: ['', Validators.required],
      duration: [''],
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
        let nativeHomeInputBox = this.input.nativeElement as HTMLInputElement;
      
          // let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0] as HTMLInputElement;
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
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
      });
  
    // this.buildMap();
    // console.log(this.mapInput.config)
    // this.searchMap();
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

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
    }
}


  buildMap() {
    mapboxgl.accessToken= 'pk.eyJ1IjoiYWxpemFoaWRjaCIsImEiOiJjanZvNzJvdGcxcTMzM3ptbDd5b2F5N3l2In0.Z1g7_CVa4-Nld_m4jBFsYw';
    this.map = new mapboxgl.Map({
      container: 'map',
      // style: this.style,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // this.map.addControl(new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   query: 'Paris, France',
    //   limit: 2
    //   }));
    // console.log(this.map)

    // var geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl
    //   });

   

  //  geocoder.forwardGeocode({
  //     query: 'Paris, France',
  //     limit: 2
  //   })
  //     .send()
  //     .then(response => {
  //       const match = response.body;
  //       console.log(match)
  //     });

  }

  searchMap(){
   
   
  }

  logForm(){
    console.log(this.todo.value)
  }
  GoBack(){
    this.router.navigateBack('/booking');
    
  }

  async presentAlertConfirm(bill,cls,dat,hr,loc,lat,lon) {
    let bl=bill;
    let cl=cls;
    let dt=dat;
    let h=hr;
let uid=this.userid;
    let msg='Dear Customer your trip details are below <br> <hr> Bill :<strong>'+bl+'</strong>$'+'<br> <hr> Class:'+cls+'<br> <hr> Date:'+dat+'<br> <hr> Duration:'+hr+'hours <br> <hr> ' +'<br> <hr> Location:'+this.fromLocation+'<br> <hr> Lat:'+lat+'<br> <hr> Lon:'+lon;
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
              'type':'hourly',
              'estimated-fare':bill,
              'pickup':this.fromLocation,
              'pickup-coords':lat+','+lon,
              'status':'pending',
              'class':cls,
              'date':dat,
              'duration':hr,
              'instructions':this.todo.value.instructions

            }
            this.api.hourlyBooking(booking).then(res=>{
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

  BookNow(){
this.fromLocation;
    this.classes=this.classes.filter(res=>{
 
      return res.isChecked;
    })
    this.classes.forEach(element=>{
    this.todo.value.class=element.name
    })
   
   let hours;
   hours=this.todo.value.duration.split(" ", 2)

   if(this.todo.value.class=="Economy"){
this.economyBill=this.economyRate * hours[0];

   }
   else
   {
  this.businessBill=this.businessRate*hours[0]
   }
 

   this.totalBill=this.businessBill+this.economyBill
 
  
    this.presentAlertConfirm(this.totalBill,this.todo.value.class,this.todo.value.date,hours[0],this.todo.value.from,this.latitude,this.longitude)
  }

}
