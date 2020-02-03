import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandSocietaComponent } from './land-societa.component';

describe('LandSocietaComponent', () => {
  let component: LandSocietaComponent;
  let fixture: ComponentFixture<LandSocietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandSocietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandSocietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
