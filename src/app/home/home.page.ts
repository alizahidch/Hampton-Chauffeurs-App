import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: NavController) { }

  ngOnInit() {
  }

  slides=[
    {
      imageUrl: '/assets/slide1.jpg',
      title: 'First ',
  
    },
    {
      imageUrl: '/assets/slide2.jpg',
      title: 'Second',
   
    },
  ]


visitBooking(){
  this.router.navigateForward('/booking');
}


visitSetting(){
  this.router.navigateForward('/settings');
}


}
