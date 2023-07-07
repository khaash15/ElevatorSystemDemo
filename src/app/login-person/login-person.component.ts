import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export type loginTemp = {
  buildingName: string;
  fromFloor: number;
  ToFloor: boolean;
};

@Component({
  selector: 'app-login-person',
  templateUrl: './login-person.component.html',
  styleUrls: ['./login-person.component.css'],
})
export class LoginPersonComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  loginForm = this.fb.group({
    buildingName: ['', Validators.required],
    fromFloor: ['', Validators.required],
    ToFloor: ['', Validators.required],
  });

  obj: loginTemp = {
    buildingName: '',
    fromFloor: 0,
    ToFloor: true,
  };
  id = 'c0481f69-8c10-4d76-dead-08db7e1e974c';
  onSubmitDetails() {
    if (this.loginForm.valid) {
      this.obj = {
        buildingName: this.loginForm.value.buildingName as any,
        fromFloor: this.loginForm.value.fromFloor as any,
        ToFloor: this.loginForm.value.ToFloor as any,
      };
      console.log(this.obj);
      this.http
        .post(
          `https://team4-api-naf.azurewebsites.net/Person/${this.id}`,
          this.obj
        )
        .subscribe((val) => console.log(val));
    }
  }
}
