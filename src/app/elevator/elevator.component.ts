import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css'],
})
export class ElevatorComponent {
  // numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  // isOpen: boolean = false;
  // currentNumber: number= 0;
  // handleButtonClick(number: number) {
  //   this.isOpen = true;
  //   setTimeout(() => {
  //     this.isOpen = false;
  //   }, 3000);
  // }

  doorOpen: boolean = false;

  selectFloor(floor: number) {
    this.activeFloor = floor;
    this.moveLift();

    // console.log(floor);
  }
  // sound: any = new Howl({
  //   src: [
  //     'https://embed.music.apple.com/us/album/elevator-music/468166499?i=468166506',
  //   ],
  // });

  ngOnInit() {
    var box: any = document.querySelector('.elevator-door');
    var floor: any = document.querySelector('.floor');

    // this.sound.play();

    box.style.setProperty('--rightDoor', 0);
    box.style.setProperty('--leftDoor', 0);
    floor.style.setProperty('--floorHeight', this.Floors.length * 400 + 'px');

    this.moveLift();
    // let audio: any = new Audio(
    //   'https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7'
    // );
  }

  moveLift() {
    this.clossDoorLogic();
    this.IsDoorOpen = !this.IsDoorOpen;

    setTimeout(() => {
      var elevator: any = document.querySelector('.elevator');
      elevator.style.setProperty(
        '--MoveElev',
        (this.Floors.length - 1 - this.activeFloor) * 400 + 'px'
      );
    }, 500);

    setTimeout(() => {
      this.OpenDoorLogic();
      this.IsDoorOpen = !this.IsDoorOpen;
    }, 7000);
    setTimeout(() => {
      this.clossDoorLogic();
      this.IsDoorOpen = !this.IsDoorOpen;
    }, 2000);

    // if (this.activeFloor == 0) {
    //   this.isBottomFloor = true;
    //   this.isTopFloor = false;
    // } else if (this.activeFloor == this.Floors.length - 1) {
    //   this.isBottomFloor = false;

    //   this.isTopFloor = true;
    // } else {
    //   this.isTopFloor = false;
    //   this.isBottomFloor = false;
    // }
  }

  IsDoorOpen: boolean = false;
  openDoor(dir: string) {
    var box: any = document.querySelector('.elevator-door');
    box.style.setProperty('--rightDoor', '-100px');
    box.style.setProperty('--leftDoor', '-100px');
    this.IsDoorOpen = !this.IsDoorOpen;
    // this.sound.play();
    this.closeDoor();
    //var boxAfter: any = window.getComputedStyle(box, '::after');
    //boxAfter.top = parseFloat(boxAfter.top) - 1;

    // console.log(boxAfter);
  }

  timer: any;

  clossDoorLogic() {
    var box: any = document.querySelector('.elevator-door');
    box.style.setProperty('--rightDoor', '0px');
    box.style.setProperty('--leftDoor', '0px');
  }
  OpenDoorLogic() {
    var box: any = document.querySelector('.elevator-door');
    box.style.setProperty('--rightDoor', '-100px');
    box.style.setProperty('--leftDoor', '-100px');
  }

  closeDoor() {
    this.timer = setTimeout(() => {
      this.clossDoorLogic();
      this.IsDoorOpen = !this.IsDoorOpen;
    }, 3000);
  }

  Persons: Array<any> = [];
  Floors: Array<number> = [0, 1, 2, 3, 4, 5];
  activeFloor: number = this.Floors[this.Floors.length - 1];

  isTopFloor: boolean = false;
  isBottomFloor: boolean = false;

  power: boolean = true;
  generator: boolean = false;
  MaxWeight: number = 500;
  // CurrentWeight: number;
  SumWeight: number = 0;
  changePower() {
    this.power = !this.power;
    this.generator = !this.generator;
  }

  showWeight(person: any) {
    person.showW = !person.showW;
  }
  AddPerson() {
    if (this.IsDoorOpen) {
      var personWeight: number = Math.floor(Math.random() * (120 - 30) + 30);
      if (this.SumWeight + personWeight < this.MaxWeight) {
        const person = {
          per: '😶',
          weight: personWeight,
          showW: true,
        };
        this.Persons.push(person);
        this.SumWeight += personWeight;
        console.log(this.Persons);
        clearTimeout(this.timer);
        this.closeDoor();
      } else {
        console.log('Reached Maximum Limit');
      }
    }
  }
  LiftOpen(Floors: any, fl: any) {
    this.openDoor('u');
    this.selectFloor(Floors.length - fl - 1);
    // openDoor('d');selectFloor(Floors.length-fl-1)
  }
}
