import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelEpgComponent } from './channel-epg.component';

describe('ChannelEpgComponent', () => {
  let component: ChannelEpgComponent;
  let fixture: ComponentFixture<ChannelEpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelEpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelEpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
