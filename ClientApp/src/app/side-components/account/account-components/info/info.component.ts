import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../services/account/account.service';


@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
  styleUrls: ['./../../../../../styles.css','./info.component.css']
})
export class AccountInfoComponent implements OnInit  {
    
  constructor(private _accountService:AccountService) {
    
  }

  ngOnInit() {

  }

}

