import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComuniEditComponent } from './comuni-edit.component';

describe('ComuniEditComponent', () => {
  let component: ComuniEditComponent;
  let fixture: ComponentFixture<ComuniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComuniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComuniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
