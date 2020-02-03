import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NazioniListComponent } from './nazioni-list.component';

describe('NazioniListComponent', () => {
  let component: NazioniListComponent;
  let fixture: ComponentFixture<NazioniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NazioniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NazioniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
