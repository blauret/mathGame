import { Component, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';


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
  // @ViewChild("myinput") myinputField: any;
  @ViewChild("myinput", { read: ElementRef, static: false })
  myinputField!: ElementRef; // map server

  public timeLeft$: Observable<timeComponents>;
  title = 'math_game';


  partOptions : any = 
  {
    background: {
      color: {
        value: "#FFFFFFFF"
      }
    },
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    interactivity: {
      detectsOn: "window"
    },
    emitters: {
      position: {
        x: 50,
        y: 100
      },
      rate: {
        quantity: 5,
        delay: 0.25
      }
    },
    particles: {
      color: {
        value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true
        },
        outModes: {
          top: "none",
          default: "destroy"
        },
        speed: { min: 25, max: 50 }
      },
      number: {
        value: 0
      },
      opacity: {
        value: 1
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30
        }
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 30
        }
      },
      size: {
        value: 8
      },
      roll: {
        darken: {
          enable: true,
          value: 25
        },
        enable: true,
        speed: {
          min: 5,
          max: 15
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7
        }
      },
      shape: {
        type: [
          "circle",
          "square",
          "polygon",
          "character",
          "character",
          "character",
          "image",
          "image",
          "image"
        ],
        options: {
          image: [
            {
              src: "https://particles.js.org/images/fruits/apple.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/avocado.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/banana.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/berries.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/cherry.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/grapes.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/lemon.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/orange.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/peach.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/pear.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/pepper.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/plum.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/star.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/strawberry.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/watermelon.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            },
            {
              src: "https://particles.js.org/images/fruits/watermelon_slice.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16
                }
              }
            }
          ],
          polygon: [
            {
              sides: 5
            },
            {
              sides: 6
            }
          ],
          character: [
            {
              fill: true,
              font: "Verdana",
              value: ["💩", "🤡", "🍀", "🍙", "🦄", "⭐️"],
              style: "",
              weight: 400
            }
          ]
        }
      }
    }
  };

  started : boolean = false;
  finished : boolean = false;
  startDate : Date = new Date();
  timeLeft: number  = 3;
  good = 0;
  bad = 0;
  
  numberA : number = 0;
  numberB : number = 0;

  form: UntypedFormGroup;



  constructor( private fb: UntypedFormBuilder) {
    

    this.form = this.fb.group({
      result: ['']
    });

    this.form.disable();


    this.randomizeNumbers();
    this.timeLeft$ = interval(1000).pipe(
      map(x => this.calcDateDiff()),
      shareReplay(1)
    );
  }
 
  setRestart () {
    this.started = false;
    this.finished = false;

  }

  setStarted () {
    console.log("started");
    this.form.enable();
    this.startDate = new Date();
    this.startDate.setSeconds(this.startDate.getSeconds() + this.timeLeft);
    this.started = true;
    this.myinputField.nativeElement.focus();
    
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

    if (timeDifference <= 0) {
      this.finished = true;
      this.form.disable();
      return { secondsToDday :  0, minutesToDday:0, hoursToDday: 0, daysToDday: 0};
    }
  
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
