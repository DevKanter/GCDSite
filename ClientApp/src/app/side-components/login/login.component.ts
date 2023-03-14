import { Component, OnInit, Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, FormGroup, Validators } from '@angular/forms';
import { RSAHelper } from '../../../services/helper/RSAHelper';
import { UserLoginRequest, UserLoginResponse } from './../../../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../services/account/account.service';
import { User } from 'oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../styles.css','./login.component.css','./../side.component.css']
})
export class LoginComponent implements OnInit  {

  public loginFormGroup: FormGroup;
  public hide = true;

  constructor(private _accountService:AccountService) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
  }

  ngOnInit() {
    this._accountService.loginComponent = this;
    this._accountService.tryRestoreLogin();
  }

  public onLoginBtnClick() {
    const username = this.loginFormGroup.controls["username"].getRawValue();
    const password = this.loginFormGroup.controls["password"].getRawValue();

    this._accountService.requestLogin(username, password);
  }
}

