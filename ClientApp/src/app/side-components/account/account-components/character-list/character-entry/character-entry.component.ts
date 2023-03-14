import { Component, Input, OnInit } from '@angular/core';
import { CharacterListEntry, ClassCode } from 'src/models/Account';

@Component({
  selector: 'app-character-entry',
  templateUrl: './character-entry.component.html',
  styleUrls: ['./character-entry.component.css']
})
export class CharacterEntryComponent implements OnInit {

  @Input()
  public character:CharacterListEntry;

  public icon="";
  constructor() { }

  ngOnInit(): void {
   this.icon = "assets/charIcons/"+this.character.classCode+".png";
  }

}
