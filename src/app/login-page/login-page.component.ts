import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LiftServicesService } from '../lift-services.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private lift: LiftServicesService,
    private route: Router
  ) {}

  loginForm = this.fb.group({
    BuildingName: ['', Validators.required],
  });
  BuildingName = '';
  NumberOfFloors = 0;
  onSubmitDetails() {
    if (this.loginForm.valid) {
      // this.http
      //   .get(
      //     `https://team4-api-naf.azurewebsites.net/getNumberOfFloors/${
      //       this.loginForm.value.BuildingName as string
      //     }`
      //   )
      //   .subscribe((val) => {
      //     console.log(val);
      //     this.BuildingName = this.loginForm.value.BuildingName as string;
      //     // this.out.emit({ buildingName, val });
      //     this.NumberOfFloors = val as number;
      //   });
      // this.route.navigate(['/liftPage']);
      this.lift.onSubmitLoginDetails(
        this.loginForm.value.BuildingName as string
      );
    }
  }
}
