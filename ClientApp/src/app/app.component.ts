import { Component,OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { LandingPageComponent } from './other/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./../styles.css']
})
export class AppComponent {
  title = 'app';

  private _landingDialog:MatDialogRef<LandingPageComponent>;
  constructor(private _dialog: MatDialog){}


  ngOnInit(): void {
    this.openLandingPage();
  } 
  public openLandingPage(){
    this._landingDialog = this._dialog.open(LandingPageComponent);
  }

}
