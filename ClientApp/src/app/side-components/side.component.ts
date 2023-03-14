import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./../../styles.css', './side.component.css']
})
export class SideComponent implements OnInit {


  constructor(public accountService: AccountService) {
  }

  ngOnInit() {

  }


}
