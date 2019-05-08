import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loading;
name;
email;
password;
role;


signupForm: FormGroup;
  constructor( private router: NavController,private alertCtrl: AlertController, private loadingCtrl: LoadingController, private fb: FormBuilder) {
    this.signupForm = fb.group({
      'full_name': [null, Validators.compose([Validators.required])],
      'phone_number': [null, Validators.compose([Validators.required])],
      'email_address': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirm_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });

   }

  ngOnInit() {
  }

login(){
  this.router.navigateRoot('/home');

}

async presentLoader() {
  this.loading = await this.loadingCtrl.create({
  });
  await this.loading.present();
}
async closeLoader() {
  await this.loading.dismiss();
}


signup(){
// this.presentLoader();
console.log(this.signupForm.value)

this.router.navigateForward('/rideragreement/' + this.signupForm.value.full_name + "/" + this.signupForm.value.phone_number + "/" + this.signupForm.value.email_address + "/" + this.signupForm.value.password)
//   this.router.navigateForward('/home');
}

resetPassword(){
  console.log("password resest method");
}

}
