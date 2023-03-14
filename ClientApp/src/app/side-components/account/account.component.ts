import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl, FormGroup, Validators } from '@angular/forms';
import { RSAHelper } from '../../../services/helper/RSAHelper';
import { AccountInfoResponse, AccountType, UserLoginRequest, UserLoginResponse } from './../../../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../services/account/account.service';
import { Router } from '@angular/router';
import { MatTooltipModule} from'@angular/material/tooltip';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./../../../styles.css','./account.component.css']
})
export class AccountComponent implements OnInit  {
  
  private _accountInfo: AccountInfoResponse = new AccountInfoResponse();
  public displayAccountType: string;
  public charImgSrc = "assets/characters.png";
  public infoImgSrc = "assets/account_info.png";
  public cashImgSrc = "assets/cash.png";
  public settingsImgSrc = "assets/settings.png";

  constructor(private _accountService:AccountService, private router:Router, private _tooltip:MatTooltipModule) {
    
  }

  ngOnInit() {
    this._accountService.accountComponent = this;
    this._accountService.requestAccountInfo();
  }

  public onLogoutBtnClick() {
    this._accountService.requestLogout();
  }
  public get accountInfo(): AccountInfoResponse {
    return this._accountInfo;
  }
  public set accountInfo(value: AccountInfoResponse) {
    this._accountInfo = value;
    this.displayAccountType = AccountType[value.accountType];
  }

  onCharsButton = function () {
    this.router.navigateByUrl('/accountcharacterlist');
  };
  onInfoButton = function () {
    this.router.navigateByUrl('/accountinfo');
  };
  onCashButton = function () {
    this.router.navigateByUrl('/accountcash');
  };
  onSettingsButton = function () {
    this.router.navigateByUrl('/accountsettings');
  };
}

