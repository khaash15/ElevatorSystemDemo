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

  // openDoor() {
  //   this.doorOpen = true;
  //   setTimeout(() => {
  //     this.closeDoor();
  //   }, 3000); // Close the door after 3 seconds (adjust as needed)
  // }

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
    this.closeDoor();
    this.IsDoorOpen = !this.IsDoorOpen;

    setTimeout(() => {
      var elevator: any = document.querySelector('.elevator');
      elevator.style.setProperty(
        '--MoveElev',
        (this.Floors.length - 1 - this.activeFloor) * 400 + 'px'
      );
      console.log('door');
    }, 500);

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

  openDoorLogic() {
    var box: any = document.querySelector('.elevator-door');
    box.style.setProperty('--rightDoor', '-100px');
    box.style.setProperty('--leftDoor', '-100px');
  }

  openDoor(dir: string, fl: any) {
    const currentFlr = this.Floors.length - fl - 1;
    if (currentFlr == this.activeFloor) {
      this.openDoorLogic();
      this.IsDoorOpen = !this.IsDoorOpen;
      this.closeDoor();
    } else {
      this.activeFloor = currentFlr;
      this.closeDoor();
      console.log(this.checkCloseDoor);

      if (this.checkCloseDoor) this.moveLift();
      setTimeout(() => {
        this.openDoorLogic();
      }, 4000);
      setTimeout(() => {
        this.closeDoor();
      }, 5000);
    }

    console.log(this.activeFloor, currentFlr);

    // this.sound.play();

    //var boxAfter: any = window.getComputedStyle(box, '::after');
    //boxAfter.top = parseFloat(boxAfter.top) - 1;

    // console.log(boxAfter);
  }

  timer: any;
  checkCloseDoor: boolean = false;
  clossDoorLogic() {
    var box: any = document.querySelector('.elevator-door');
    box.style.setProperty('--rightDoor', '0px');
    box.style.setProperty('--leftDoor', '0px');
  }

  closeDoor() {
    this.checkCloseDoor = true;
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
}
