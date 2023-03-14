import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountCharacterListComponent } from 'src/app/side-components/account/account-components/character-list/character-list.component';
import { AccountComponent } from '../../app/side-components/account/account.component';
import { LoginComponent } from '../../app/side-components/login/login.component';
import { RegisterComponent } from '../../app/side-components/register/register.component';
import { AccountInfoRequest, AccountInfoResponse, CharacterListRequest, CharacterListResponse, UserLoginRequest, UserLoginResponse, UserLogoutRequest, UserLogoutResponse, UserRegisterRequest, UserRegisterResponse } from '../../models/Account';
import { RequestService } from '../request/RequestService';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  public loginComponent: LoginComponent;
  public registercomponent: RegisterComponent;
  public accountComponent: AccountComponent;

  public characterComponent:AccountCharacterListComponent;

  public loggedIn = false;

  public sessionID: string;
  public accountInfo: AccountInfoResponse;

  private _lastRegisterRequest: UserRegisterRequest;

  constructor(private _request: RequestService, private _snackBar: MatSnackBar) {

  }


  public requestCreateAccount(username: string, password: string, email: string) {
    const request: UserRegisterRequest = {
      Username: username,
      Password: password,
      Email: email,
    }
    this._lastRegisterRequest = request;
    this._request.sendPostRequest(request,"/Account/RegisterAccount").subscribe({
      next: (result: UserRegisterResponse) => {
        result.success ?
          this._onRegisterSuccess() :
          this._onRegisterFail(result.error);
    },
    error: (error) => {
      //console.log(error);
      this._snackBar.open("Server Error ["+error+"]!")
    }
  });
  }
  public requestLogin(username: string, password: string) {
    const request: UserLoginRequest = {
      Username: username,
      Password: password
    }
    this._request.onLoginRequest(request);
    this._request.sendPostRequest(request, "/Account/Login").subscribe({
      next: (result: UserLoginResponse) => {
        result.success ?
          this._onLoginSuccess(result.sessionID) :
          this._onLoginFail(result.error);
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open("Server Error!", "", { duration: 2000 })
      }
    });
  }
  public tryRestoreLogin() {
    this._request.tryUseStoredLogin().subscribe({
      next: (result: UserLoginResponse) => {
        result.success ?
          this._onLoginSuccess(result.sessionID) :
          this._onLoginFail(result.error);
      },
      error: (error) => {
        this._snackBar.open("No login stored!", "", { duration: 2000 })
      }
    });
  }
  public requestLogout() {
    const request: UserLogoutRequest = new UserLogoutRequest(this.sessionID);
    this._request.sendPostRequest(request, "/Account/Logout").subscribe({
      next: (result: UserLogoutResponse) => {
        result.success ? this._onLogoutSuccess() : this._onLogoutFail();
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open("Server Error!")
      }
    });
  }
  public requestAccountInfo() {
    const request: AccountInfoRequest = new AccountInfoRequest(this.sessionID);
    this._request.sendPostRequest(request, "/Account/GetInfo").subscribe({
      next: (result: AccountInfoResponse) => {
        result.success ? 
          this._onAccountInfoSuccess(result):
          this._onAccountInfoFail(result.error)
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open("Server Error!")
      }
    });
  }

  public requestCharacterList() {
    const request: CharacterListRequest = new CharacterListRequest(this.sessionID);
    this._request.sendPostRequest(request, "/Account/GetCharacterList").subscribe({
      next: (result: CharacterListResponse) => {
        result.success ? 
          this._onCharListSuccess(result):
          this._onCharListFail(result.error)
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open("Server Error!")
      }
    });
  }

  private _onRegisterSuccess() {
    this._snackBar.open("Account created successfully!", "", { duration: 2000 });
    const username = this._lastRegisterRequest.Username;
    const password = this._lastRegisterRequest.Password;

    this.requestLogin(username, password);
  }
  private _onRegisterFail(error:string) {
    this._snackBar.open("Account creation failed ["+error+"]!", "", { duration: 2000 });
  }

  private _onLoginSuccess(sessionID:string) {
    this._snackBar.open("Login successfully!","", { duration: 2000 })
    this.sessionID = sessionID;
    this.loggedIn = true;
    this._request.onLoginSuccess();
    
}
  private _onLoginFail(error:string) {
    this._snackBar.open("Login failed! [" +error+"]", "", { duration: 2000 });
  }

  private _onLogoutSuccess() {
    this.sessionID = "";
    this.loggedIn = false;
    this._request.onLogoutSuccess();
  }
  private _onLogoutFail() {
    this._snackBar.open("Logout failed! Session was reset", "", { duration: 2000 });
    this.sessionID = "";
    this.loggedIn = false;
    this._request.onLogoutSuccess();
  }

  private _onAccountInfoSuccess(info: AccountInfoResponse) {
    this.accountInfo = info;
    this.accountComponent.accountInfo = info;
  }
  private _onAccountInfoFail(error: string) {
    this._snackBar.open("Error retrieving AccountInfo ["+error+"]", "", { duration: 2000 });
  }

  private _onCharListSuccess(response:CharacterListResponse){
    this.characterComponent.characters = response.characterList;
  }
  private _onCharListFail(error:string){
    this._snackBar.open(error, "", { duration: 2000 });
  }
}
