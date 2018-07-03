import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPageComponent } from './channel-page.component';

describe('ChannelPageComponent', () => {
  let component: ChannelPageComponent;
  let fixture: ComponentFixture<ChannelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
