import { Component, OnInit, Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, FormGroup, Validators } from '@angular/forms';
import { RSAHelper } from '../../../services/helper/RSAHelper';
import { UserRegisterRequest, UserRegisterResponse } from './../../../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../../../styles.css','./register.component.css','./../side.component.css']
})
export class RegisterComponent implements OnInit  {

  public registerFormGroup: FormGroup;
  public hide = true;

  constructor(
    private _accountService:AccountService,
    private _customValidators: CustomValidators,
    private _snackBar:MatSnackBar) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), this._customValidators.specialValidator]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10), this._customValidators.specialValidator]),
      passwordConfirm: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    });

  }

  ngOnInit() {
    this._accountService.registercomponent = this;
  }

  public onRegisterBtnClick() {

    const username = this.registerFormGroup.controls["username"].getRawValue();
    const password = this.registerFormGroup.controls["password"].getRawValue();
    const checkPassword = this.registerFormGroup.controls["passwordConfirm"].getRawValue();
    const email = this.registerFormGroup.controls["email"].getRawValue();

  if(checkPassword!==password){
    this._snackBar.open("Passwords do not match!","",{duration:3000})
    return;
  }

    this._accountService.requestCreateAccount(username, password, email);
    
  }


}


@Directive({
  selector: '[appCustomValidators]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CustomValidators,
    multi: true
  }]
})
export class CustomValidators {
  specialValidator(control: FormControl): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidString: true };
    }
  }
  sameValidator = (other: string) => {
    return (control: FormControl) => {
      if (control.value !==other) {
        return { notSame: true };
      }
    }
  }
}
