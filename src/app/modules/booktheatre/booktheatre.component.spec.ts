import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktheatreComponent } from './booktheatre.component';

describe('BooktheatreComponent', () => {
  let component: BooktheatreComponent;
  let fixture: ComponentFixture<BooktheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooktheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooktheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
