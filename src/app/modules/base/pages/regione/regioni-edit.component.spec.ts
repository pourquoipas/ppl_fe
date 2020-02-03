import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioniEditComponent } from './regioni-edit.component';

describe('RegioniEditComponent', () => {
  let component: RegioniEditComponent;
  let fixture: ComponentFixture<RegioniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegioniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
