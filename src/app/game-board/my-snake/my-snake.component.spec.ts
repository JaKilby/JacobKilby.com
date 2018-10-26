import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnakeComponent } from './my-snake.component';

describe('MySnakeComponent', () => {
  let component: MySnakeComponent;
  let fixture: ComponentFixture<MySnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySnakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
