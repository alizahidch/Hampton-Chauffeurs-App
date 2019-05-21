import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(private router:NavController) { }

  ngOnInit() {
  }

  hourly(){
    this.router.navigateForward('/hourly');
  }

  GoBack(){
    this.router.navigateBack('/home');
    
  }
}
