import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LiftServicesService } from '../lift-services.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export type loginTemp = {
  BuildingName: string;
  NoOfFloors: number;
  Generator_Staus: boolean;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private lift: LiftServicesService,
    private route: Router
  ) {}

  loginForm = this.fb.group({
    BuildingName: ['', Validators.required],
    NoOfFloors: ['', Validators.required],
    Generator_Staus: [RadioNodeList, Validators.required],
  });

  obj: loginTemp = {
    BuildingName: '',
    NoOfFloors: 0,
    Generator_Staus: true,
  };

  onSubmitDetails() {
    if (this.loginForm.valid) {
      this.obj = {
        BuildingName: this.loginForm.value.BuildingName as any,
        NoOfFloors: this.loginForm.value.NoOfFloors as any,
        Generator_Staus:
          (this.loginForm.value.Generator_Staus as any) === '1' ? true : false,
      };
      console.log(this.obj);
      this.http
        .post('https://team4-api-naf.azurewebsites.net/Building', this.obj)
        .subscribe((val) => console.log(val));
      this.lift.BuildingName = this.loginForm.value.BuildingName as string;
      this.lift.NumberOfFloors = this.loginForm.value.NoOfFloors as any;
      this.route.navigate(['/login']);
    }
  }
}
