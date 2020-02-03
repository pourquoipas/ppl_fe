import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NazioniEditComponent } from './nazioni-edit.component';

describe('NazioniEditComponent', () => {
  let component: NazioniEditComponent;
  let fixture: ComponentFixture<NazioniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NazioniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NazioniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
