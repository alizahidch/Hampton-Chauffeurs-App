import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
@Component({
  selector: 'app-rideragreement',
  templateUrl: './rideragreement.page.html',
  styleUrls: ['./rideragreement.page.scss'],
})
export class RideragreementPage implements OnInit {
  terms: string;
  user_data: any = {};
  loading;
  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private router: NavController, private activeRoute: ActivatedRoute, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
this.terms="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

this.user_data.full_name = this.activeRoute.snapshot.paramMap.get('full_name');
    this.user_data.phone_number = this.activeRoute.snapshot.paramMap.get('phone_number');
    this.user_data.email_address = this.activeRoute.snapshot.paramMap.get('email_address');
    this.user_data.password = this.activeRoute.snapshot.paramMap.get('password');

   }

  ngOnInit() {
  }

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
            role: 'rider'
          })
          .then(() => {
            window.localStorage.setItem("user_id", data.user.uid);
            window.localStorage.setItem("user_name", this.user_data.full_name);
            window.localStorage.setItem("user_contact", this.user_data.phone_number);
            window.localStorage.setItem("user_email", this.user_data.email_address);
            window.localStorage.setItem("user_password", this.user_data.password);
            this.closeLoader();
            this.router.navigateRoot('/home');
          });

      }, error => {
        this.closeLoader();
        this.presentAlert("User already Exists", error.message);
        console.log(error.message);
        this.goBack();
      })

  }

  goBack() {
    this.router.back();
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

}
