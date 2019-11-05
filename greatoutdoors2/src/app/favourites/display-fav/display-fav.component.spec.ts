import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFavComponent } from './display-fav.component';

describe('DisplayFavComponent', () => {
  let component: DisplayFavComponent;
  let fixture: ComponentFixture<DisplayFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
