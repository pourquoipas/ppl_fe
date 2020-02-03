import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifederatiListComponent } from './statifederati-list.component';

describe('StatofederatoListComponent', () => {
  let component: StatifederatiListComponent;
  let fixture: ComponentFixture<StatifederatiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatifederatiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatifederatiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
