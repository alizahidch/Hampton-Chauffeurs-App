import { Component } from '@angular/core';
import { NavController ,ModalController} from '@ionic/angular';


import { TestpagePage } from '../test/testpage/testpage.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: NavController,public modalCtrl: ModalController) { }

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

visitTest(){
  this.router.navigateForward('/testpage');
}

visitSetting(){
  this.router.navigateForward('/settings');
}


}
