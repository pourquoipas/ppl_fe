import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitoliStudioListComponent } from './titoli-studio-list.component';

describe('TitoliStudioListComponent', () => {
  let component: TitoliStudioListComponent;
  let fixture: ComponentFixture<TitoliStudioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitoliStudioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitoliStudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
