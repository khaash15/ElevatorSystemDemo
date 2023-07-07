import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPersonComponent } from './login-person.component';

describe('LoginPersonComponent', () => {
  let component: LoginPersonComponent;
  let fixture: ComponentFixture<LoginPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPersonComponent]
    });
    fixture = TestBed.createComponent(LoginPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
