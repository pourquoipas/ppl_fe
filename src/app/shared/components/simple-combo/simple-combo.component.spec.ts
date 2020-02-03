import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComboComponent } from './simple-combo.component';

describe('SimpleComboComponent', () => {
  let component: SimpleComboComponent;
  let fixture: ComponentFixture<SimpleComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
