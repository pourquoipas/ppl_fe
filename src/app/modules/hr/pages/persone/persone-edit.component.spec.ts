import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneEditComponent } from './persone-edit.component';

describe('PersoneEditComponent', () => {
  let component: PersoneEditComponent;
  let fixture: ComponentFixture<PersoneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersoneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
