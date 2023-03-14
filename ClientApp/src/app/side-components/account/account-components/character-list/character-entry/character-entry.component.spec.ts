import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEntryComponent } from './character-entry.component';

describe('CharacterEntryComponent', () => {
  let component: CharacterEntryComponent;
  let fixture: ComponentFixture<CharacterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
