import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastPlaceholderComponent } from './cast-placeholder.component';

describe('CastPlaceholderComponent', () => {
  let component: CastPlaceholderComponent;
  let fixture: ComponentFixture<CastPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
