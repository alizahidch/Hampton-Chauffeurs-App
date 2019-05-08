import { Injectable } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user_data: any = {};
  loading;


  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private router: NavController, private activeRoute: ActivatedRoute, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  signup() {
    this.presentLoader();
    this.afAuth.auth.createUserWithEmailAndPassword(this.user_data.email_address, this.user_data.password)
      .then(data => {
        console.log(data.user.uid);
        this.db.object("/users/" + data.user.uid)
          .update({
            name: this.user_data.full_name,
            email: this.user_data.email_address,
            contact: this.user_data.phone_number,
            imageurl:'https://firebasestorage.googleapis.com/v0/b/my-pocket-lawyer.appspot.com/o/Users%2Fteac.png?alt=media&token=fc7e6fbc-2474-4865-87f6-690698c4c68c',
            status: 'active',
            role: 'user'
          })
          .then(() => {
            window.localStorage.setItem("user_id", data.user.uid);
            window.localStorage.setItem("user_name", this.user_data.full_name);
            window.localStorage.setItem("user_contact", this.user_data.phone_number);
            window.localStorage.setItem("user_email", this.user_data.email_address);
            window.localStorage.setItem("user_password", this.user_data.password);
            this.closeLoader();
            this.router.navigateRoot('/');
          });

      }, error => {
        this.closeLoader();
        this.presentAlert("User already Exists", error.message);
        console.log(error.message);
        this.goBack();
      })

  }

  async presentLoader() {
    this.loading = await this.loadingCtrl.create({
    });
    await this.loading.present();
  }
  async closeLoader() {
    await this.loading.dismiss();
  }

  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
   goBack() {
    this.router.back();
  }
   userDetails(){
     return firebase.auth().currentUser;
   }
}
