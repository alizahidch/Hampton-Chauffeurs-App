import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController,AlertController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.page.html',
  styleUrls: ['./hourly.page.scss'],
})
export class HourlyPage implements OnInit {

//Map settings
map: mapboxgl.Map;
geocodingClient:mapboxgl.MapboxGeocoder;
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



  constructor(private formBuilder: FormBuilder,private router:NavController,public alertController: AlertController) { 
    this.todo = this.formBuilder.group({
      from: ['', Validators.required],
      duration: [''],
      date:[''],
      time:[''],
     class:['']
    });
  }

  ngOnInit() {
  
    this.buildMap();
    this.searchMap();
  }
  

  buildMap() {
    mapboxgl.accessToken= 'pk.eyJ1IjoiYWxpemFoaWRjaCIsImEiOiJjanZvNzJvdGcxcTMzM3ptbDd5b2F5N3l2In0.Z1g7_CVa4-Nld_m4jBFsYw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    console.log(this.map)
  }

  searchMap(){
  console.log(this.geocodingClient)
    this.geocodingClient.forwardGeocode({
      query: 'Paris, France',
      limit: 2
    })
      .send()
      .then(response => {
        const match = response.body;
        console.log(match)
      });
  }

  logForm(){
    console.log(this.todo.value)
  }
  GoBack(){
    this.router.navigateBack('/booking');
    
  }

  async presentAlertConfirm(bill,cls,dat,hr) {
    let bl=bill;
    let cl=cls;
    let dt=dat;
    let h=hr;

    let msg='Dear Customer your trip details are below <br> <hr> Bill :<strong>'+bl+'</strong>$'+'<br> <hr> Class:'+cls+'<br> <hr> Date:'+dat+'<br> <hr> Duration:'+hr+'hours';
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
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  BookNow(){

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
 
  
    this.presentAlertConfirm(this.totalBill,this.todo.value.class,this.todo.value.date,hours[0])
  }

}
