import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private router: NavController) { }

  ngOnInit() {
  }

login(){
  this.router.navigateRoot('/home');
}


signup(){
  this.router.navigateForward('/home');
}

resetPassword(){
  console.log("password resest method");
}

}
