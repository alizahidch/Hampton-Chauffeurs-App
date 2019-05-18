import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HourlyPage } from './hourly.page';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: HourlyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAYCDvDJYdHYAArV3XBlKTkDoyY4UHARTQ",
      libraries: ["places"]
  }),
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HourlyPage]
})
export class HourlyPageModule {}
