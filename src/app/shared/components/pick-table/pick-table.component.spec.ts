import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTableComponent } from './pick-table.component';

describe('PickTableComponent', () => {
  let component: PickTableComponent;
  let fixture: ComponentFixture<PickTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
