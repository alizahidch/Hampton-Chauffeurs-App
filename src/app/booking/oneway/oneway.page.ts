import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-oneway',
  templateUrl: './oneway.page.html',
  styleUrls: ['./oneway.page.scss'],
})
export class OnewayPage implements OnInit {

  constructor(private router:NavController) { }

  ngOnInit() {
  }

  GoBack(){
    this.router.navigateBack('/booking');
    
  }

}
