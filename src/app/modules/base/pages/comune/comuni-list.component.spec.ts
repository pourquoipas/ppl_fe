import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComuniListComponent } from './comuni-list.component';

describe('ComuniListComponent', () => {
  let component: ComuniListComponent;
  let fixture: ComponentFixture<ComuniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComuniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComuniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
