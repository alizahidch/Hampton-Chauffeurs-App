import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnewayPage } from './oneway.page';
import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  {
    path: '',
    component: OnewayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAYCDvDJYdHYAArV3XBlKTkDoyY4UHARTQ",
      libraries: ["places","geometry"]
  }),
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnewayPage]
})
export class OnewayPageModule {}
