import { Component } from '@angular/core';

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
    // console.log(`Floor ${floor} selected.`);
    this.openDoor();
  }

  openDoor() {
    this.doorOpen = true;
    setTimeout(() => {
      this.closeDoor();
    }, 3000); // Close the door after 3 seconds (adjust as needed)
  }

  isTopFloor: boolean = false;
  isBottomFloor: boolean = false;
  closeDoor() {
    this.doorOpen = false;
  }
  power: boolean = true;
  generator: boolean = false;

  changePower(){
    this.power= !this.power;
    this.generator =!this.generator
  }
  AddPerson(){
    
  }
}
