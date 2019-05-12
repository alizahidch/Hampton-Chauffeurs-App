import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.page.html',
  styleUrls: ['./hourly.page.scss'],
})
export class HourlyPage implements OnInit {

  time=[
    2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
  ]
  private todo : FormGroup;
  myTime: String = new Date().toTimeString();
classes=[
  {name:"Business", isChecked: false},
{name:"Economy", isChecked: false},
]



  constructor(private formBuilder: FormBuilder,private router:NavController) { 
    this.todo = this.formBuilder.group({
      from: ['', Validators.required],
      duration: [''],
      date:[''],
      time:[''],
     class:['']
    });
  }

  ngOnInit() {
  }
  logForm(){
    console.log(this.todo.value)
  }
  GoBack(){
    this.router.navigateBack('/booking');
    
  }

  BookNow(){
    console.log("function called")
    this.classes=this.classes.filter(res=>{
 
      return res.isChecked;
    })
    this.classes.forEach(element=>{
    this.todo.value.class=element.name
    })
   
   
    console.log(this.todo)
    
    
  }

}
