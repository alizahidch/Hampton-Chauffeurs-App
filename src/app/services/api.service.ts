import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "angularfire2/database";
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

oneWayBooking(booking:any){
  console.log(booking);
let bookingref:'/bookings';
return this.db.list('/bookings').push(booking);

}

getBookings(){
  return this.db.list('/bookings').
}






}
