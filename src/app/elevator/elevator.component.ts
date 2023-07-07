import { Component, ElementRef, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
// @Injectable({
//   providedIn: 'root',
// })
import { LiftServicesService } from '../lift-services.service';
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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private lift: LiftServicesService
  ) {}
  addPersonForm = this.fb.group({
    id: [''],
    toFloor: [''],
  });

  BuildingName = this.lift.BuildingName;
  NumberOfFloors = this.lift.NumberOfFloors;
  personBuildingName = '';
  SubmitPerson(fl: any) {
    fl.showAddPerson = !fl.showAddPerson;
    const idInput: any = document.querySelector('.personId');
    const ToFloorInput: any = document.querySelector('.DestFloor');
    this.AddPerson(idInput.value, ToFloorInput.value);
    const test: any = {
      fromFloor: this.activeFloor,
      buildingName: this.BuildingName,
      toFloor: ToFloorInput.value,
    };
    // id : string 7b3eaa23-269c-42dd-deae-08db7e1e974c
    this.http
      .get(
        `https://team4-api-naf.azurewebsites.net/getBuildingName/${idInput.value}`
      )
      .subscribe((val: any) => {
        console.log(val['buildingName']);
        this.personBuildingName = val['buildingName'] as string;
        console.log(
          this.BuildingName.toLocaleLowerCase() +
            ',' +
            this.personBuildingName.toLocaleLowerCase()
        );
        if (
          this.BuildingName.toLocaleLowerCase() ===
          this.personBuildingName.toLocaleLowerCase()
        ) {
          this.http
            .post(
              `https://team4-api-naf.azurewebsites.net/Person/${idInput.value}`,
              test
            )
            .subscribe((res) => {
              console.log(res);
            });

          this.http
            .delete(
              `https://team4-api-naf.azurewebsites.net/deletePersons/${test.toFloor}`
            )
            .subscribe((val: any) => {
              console.log(val);
              setTimeout(() => {
                alert('person ' + idInput.value + ' stepped out');
              });
            });
        } else {
          alert('Person not belongs to this building');
        }
      });

    this.activeFloor = ToFloorInput.value;
    this.moveLift();
    idInput.value = '';
    ToFloorInput.value = '';
  }
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
    this.http
      .get(
        `https://team4-api-naf.azurewebsites.net/getNumberOfFloors/${this.BuildingName}`
      )
      .subscribe((res: any) => {
        for (let i = 0; i <= res; i++) {
          this.Floors.push({ floor: i, showAddPerson: true });
          this.activeFloor = this.Floors[this.Floors.length - 1].floor;
          this.moveLift();

          var box: any = document.querySelector('.elevator-door');
          var floor: any = document.querySelector('.floor');

          box.style.setProperty('--rightDoor', 0);
          box.style.setProperty('--leftDoor', 0);
          floor.style.setProperty(
            '--floorHeight',
            this.Floors.length * 400 + 'px'
          );
        }
      });

    // this.sound.play();

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
    const currentFlr = this.Floors.length - fl.floor - 1;
    console.log(fl);

    if (currentFlr == this.activeFloor) {
      this.openDoorLogic();
      this.IsDoorOpen = !this.IsDoorOpen;
      this.closeDoor();
    } else {
      this.activeFloor = currentFlr;
      this.closeDoor();
      // console.log(this.checkCloseDoor);

      if (this.checkCloseDoor) this.moveLift();
      setTimeout(() => {
        this.openDoorLogic();
      }, 4000);
      setTimeout(() => {
        this.closeDoor();
      }, 5000);
    }

    // console.log(this.activeFloor, currentFlr);

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
  Floors: Array<any> = [];
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

  showFormFn(fl: any) {
    console.log(this.Floors.length - fl.floor - 1);

    if (this.Floors.length - fl.floor - 1 == this.activeFloor)
      fl.showAddPerson = !fl.showAddPerson;
  }
  AddPerson(idInput: any, ToFloorInput: any) {
    if (this.IsDoorOpen) {
      var personWeight: number = Math.floor(Math.random() * (120 - 30) + 30);
      if (this.SumWeight + personWeight < this.MaxWeight) {
        const person = {
          id: idInput,
          DestinationFloor: ToFloorInput,
          per: '😶',
          weight: personWeight,
          showW: true,
        };
        if (idInput != '') {
          this.Persons.push(person);
          this.SumWeight += personWeight;
        }
        // console.log(this.Persons);
        clearTimeout(this.timer);
        this.closeDoor();
      } else {
        alert('Reached Maximum Limit');
      }
    }
  }
}
