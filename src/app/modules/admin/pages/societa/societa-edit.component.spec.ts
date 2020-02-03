import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietaEditComponent } from './societa-edit.component';

describe('SocietaEditComponent', () => {
  let component: SocietaEditComponent;
  let fixture: ComponentFixture<SocietaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
