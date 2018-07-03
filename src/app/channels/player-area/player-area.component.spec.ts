import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAreaComponent } from './player-area.component';

describe('PlayerAreaComponent', () => {
  let component: PlayerAreaComponent;
  let fixture: ComponentFixture<PlayerAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
