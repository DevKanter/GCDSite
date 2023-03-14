import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { UserLoginRequest, UserRegisterRequest, UserRegisterResponse } from '../../models/Account';
import { RSAHelper } from '../helper/RSAHelper';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  //private _baseURL = "https://localhost:7149";
  private _baseURL = "http://92.246.89.60:5000";
  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' });

  private _lastLoginRequest;

  constructor(private _rsaHelper: RSAHelper, private _http: HttpClient, private _cookie:CookieService) { }


  public sendPostRequest(request: unknown, path:string):Observable<any> {

    const encRequest = this._rsaHelper.encryptWithPublicKey(JSON.stringify(request));
    const data = { Data: encRequest };

    return this._http.post(this._baseURL + path, data, { headers: this.headers })
  }

  public sendNoCryptRequest(request: unknown, path: string): Observable<any> {

    return this._http.post(this._baseURL + path, request, { headers: this.headers })
}
  public tryUseStoredLogin(): Observable<any> {
    const lastLogin = localStorage.getItem("lastSuccessLogin");
    if (lastLogin === null) throw throwError("No login stored");
    this._lastLoginRequest = JSON.parse(lastLogin);
    return this._http.post(this._baseURL + "/Account/Login", this._lastLoginRequest, { headers: this.headers })
  }
  public onLogoutSuccess() {
    this._lastLoginRequest = null;
    localStorage.removeItem("lastSuccessLogin");
  }
  public onLoginSuccess() {
    localStorage.setItem("lastSuccessLogin", JSON.stringify(this._lastLoginRequest));
  }
  public onLoginRequest(request: UserLoginRequest) {
    const encRequest = this._rsaHelper.encryptWithPublicKey(JSON.stringify(request));
    const data = { Data: encRequest };
    this._lastLoginRequest = data;
  }

}
