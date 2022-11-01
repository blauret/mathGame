import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { interval, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

interface timeComponents {
  secondsToDday: number;
  minutesToDday: number;
  hoursToDday: number;
  daysToDday: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  public timeLeft$: Observable<timeComponents>;
  title = 'math_game';
  partOptions : any = {};

  started : boolean = false;
  startDate : Date = new Date();
  timeLeft: number  = 300;
  good = 0;
  bad = 0;
  time: number = 300;
  interval : any;

  numberA : number = 0;
  numberB : number = 0;

  form: FormGroup;



  constructor( private fb: FormBuilder) {
    

    this.form = this.fb.group({
      result: ['']
    });

    this.randomizeNumbers();
    this.timeLeft$ = interval(1000).pipe(
      map(x => this.calcDateDiff()),
      shareReplay(1)
    );
  }
 
  setStarted () {
    console.log("started");
    this.startDate = new Date();
    this.startDate.setSeconds(this.startDate.getSeconds() + this.timeLeft);
    this.started = true;
  }
 
  randomizeNumbers(){
    this.numberA = Math.floor(Math.random() * 9) + 1;
    this.numberB = Math.floor(Math.random() * 10) + 1;
  }
  
  onKeyDownEvent(event: any){
    const val = this.form.value;
    if (this.numberA * this.numberB == val.result) {
      this.good +=1;
    } else {
      this.bad +=1;
    }
    this.form.reset();
    this.randomizeNumbers();

  }
  calcDateDiff(endDay: Date = new Date(2022, 0, 1)): timeComponents {


    const dDay = this.startDate.valueOf();
  
    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;
  
    const timeDifference = dDay - Date.now();
  
    const daysToDday = Math.floor(
      timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)
    );
  
    const hoursToDday = Math.floor(
      (timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
        hoursInADay
    );
  
    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute
    );
  
    const secondsToDday =
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;
  
    return { secondsToDday, minutesToDday, hoursToDday, daysToDday };
  }  
  
}
