import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalPlayerComponent } from './local-player.component';

describe('VideoPlayerComponent', () => {
  let component: LocalPlayerComponent;
  let fixture: ComponentFixture<LocalPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
