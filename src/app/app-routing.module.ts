import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',  loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },
  { path: 'rideragreement', loadChildren: './rideragreement/rideragreement.module#RideragreementPageModule' },
  { path: 'rideragreement/:full_name/:phone_number/:email_address/:password', loadChildren: './rideragreement/rideragreement.module#RideragreementPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'hourly', loadChildren: './booking/hourly/hourly.module#HourlyPageModule' },
  { path: 'oneway', loadChildren: './booking/oneway/oneway.module#OnewayPageModule' },
  { path: 'currentbookings', loadChildren: './booking/currentbookings/currentbookings.module#CurrentbookingsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
