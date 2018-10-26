import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnakeHeadComponent } from './my-snake-head.component';

describe('MySnakeHeadComponent', () => {
  let component: MySnakeHeadComponent;
  let fixture: ComponentFixture<MySnakeHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySnakeHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnakeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
