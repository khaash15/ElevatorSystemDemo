import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LiftServicesService {

  constructor(private http: HttpClient, private route: Router) {}
  BuildingName = '';
  NumberOfFloors = 0;
  onSubmitLoginDetails(BuildingName: string) {
    this.http
      .get(
        `https://team4-api-naf.azurewebsites.net/getNumberOfFloors/${BuildingName}`
      )
      .subscribe(
        (val) => {
          this.NumberOfFloors = val as any;
          this.BuildingName = BuildingName;
          console.log(this.BuildingName + ',' + this.NumberOfFloors);
          this.route.navigate(['/liftPage']);
        },
        (err) => {
          alert('please sign up');
          this.route.navigate(['']);
        }
      );
  }
}
