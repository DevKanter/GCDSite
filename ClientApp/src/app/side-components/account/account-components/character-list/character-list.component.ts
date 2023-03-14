import { Component, OnInit } from '@angular/core';
import { CharacterListEntry, ClassCode } from 'src/models/Account';
import { AccountService } from '../../../../../services/account/account.service';


@Component({
  selector: 'app-account-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./../../../../../styles.css','./character-list.component.css']
})
export class AccountCharacterListComponent implements OnInit  {
  
  public characters:CharacterListEntry[];

  constructor(private _accountService:AccountService) {
    _accountService.characterComponent = this;
  }

  ngOnInit() {
    this._accountService.requestCharacterList();
  }

}

