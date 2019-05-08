import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: NavController) { }

  ngOnInit() {
  }

  Logout() {
    window.localStorage.clear();
    this.router.navigateRoot('/login');
  }

}
