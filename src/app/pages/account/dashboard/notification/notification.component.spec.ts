import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNotificationComponent } from './notification.component';

describe('MyNotificationComponent', () => {
  let component: MyNotificationComponent;
  let fixture: ComponentFixture<MyNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
