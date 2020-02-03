import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDialogPickComponent } from './test-dialog-pick.component';

describe('TestDialogPickComponent', () => {
  let component: TestDialogPickComponent;
  let fixture: ComponentFixture<TestDialogPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDialogPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDialogPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
