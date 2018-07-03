import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsPanelComponent } from './channels-panel.component';

describe('ChannelsPanelComponent', () => {
  let component: ChannelsPanelComponent;
  let fixture: ComponentFixture<ChannelsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
