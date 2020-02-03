import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitoliStudioEditComponent } from './titoli-studio-edit.component';

describe('TitoliStudioEditComponent', () => {
  let component: TitoliStudioEditComponent;
  let fixture: ComponentFixture<TitoliStudioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitoliStudioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitoliStudioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
