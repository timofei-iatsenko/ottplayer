import { TestBed, async, inject } from '@angular/core/testing';

import { PlaylistGuard } from './playlist.guard';

describe('PlaylistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistGuard]
    });
  });

  it('should ...', inject([PlaylistGuard], (guard: PlaylistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
