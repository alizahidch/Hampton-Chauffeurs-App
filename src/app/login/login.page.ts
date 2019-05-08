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
  constructor( private router: NavController,private alertCtrl: AlertController,private afauth: AngularFireAuth, private db: AngularFireDatabase, private loadingCtrl: LoadingController, private fb: FormBuilder) {
    this.signupForm = fb.group({
      'full_name': [null, Validators.compose([Validators.required])],
      'phone_number': [null, Validators.compose([Validators.required])],
      'email_address': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirm_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });

this.email="user@gmail.com";
this.password=123456;

   }

  ngOnInit() {
  }
  login() {
    // this.presentLoader();
    this.afauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
     
        this.db.object('/users/' + data.user.uid).query.once("value").then(data => {

          if (data.val().status == "active") {
            window.localStorage.setItem("user_id", data.key);
            window.localStorage.setItem("user_name", data.val().name);
            window.localStorage.setItem("user_contact", data.val().contact);
            window.localStorage.setItem("user_email", this.email);
            window.localStorage.setItem("user_password", this.password);
            this.router.navigateRoot('/home');
          }
          else if(data.val().status=="suspended"){
            this.presentAlert("Account Suspended","Your account has been suspended by Admin");
          }


        })
      }, error => {
        this.closeLoader();
        if (error.code == "auth/user-not-found") {
          this.presentAlert("User not found", "No user associated with the given email, please check again");
        }
        else {
          this.presentAlert("Error", "Invalid login credentials");
        }
      })
  }
  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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
