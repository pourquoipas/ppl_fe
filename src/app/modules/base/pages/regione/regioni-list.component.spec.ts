import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioniListComponent } from './regioni-list.component';

describe('RegioniListComponent', () => {
  let component: RegioniListComponent;
  let fixture: ComponentFixture<RegioniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegioniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
