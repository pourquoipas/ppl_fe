import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatifederatiEditComponent } from './statifederati-edit.component';

describe('StatifederatiEditComponent', () => {
  let component: StatifederatiEditComponent;
  let fixture: ComponentFixture<StatifederatiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatifederatiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatifederatiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
