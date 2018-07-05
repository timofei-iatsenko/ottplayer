import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerControlBarComponent } from './player-control-bar.component';

describe('PlayerControlBarComponent', () => {
  let component: PlayerControlBarComponent;
  let fixture: ComponentFixture<PlayerControlBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerControlBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
