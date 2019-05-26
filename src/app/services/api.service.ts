import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "angularfire2/database";
import { keyframes } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
userid;
  constructor(public db:AngularFireDatabase) { 
    this.userid=localStorage.getItem('user_id');

  }

hourlyBooking(booking:any){
  console.log(booking);
let bookingref:'/bookings';
return this.db.list('/bookings').push(booking);

}

userUpdate(bid)
{ 
  let userbookings={
    'bookingid':bid
  }
  return this.db.list('/users/'+this.userid+'/userbookings').push(userbookings); 
}
oneWayBooking(booking:any){
  console.log(booking);
let bookingref:'/bookings';
return this.db.list('/bookings').push(booking);

}







}
