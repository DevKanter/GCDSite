import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../services/account/account.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./../../../../../styles.css','./settings.component.css']
})
export class AccountSettingsComponent implements OnInit  {
    
  constructor(private _accountService:AccountService) {
    
  }

  ngOnInit() {

  }

}

