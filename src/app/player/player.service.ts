import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private videoEl: HTMLVideoElement;

  public registerPlayer(el: HTMLVideoElement) {
    this.videoEl = el;
  }

  public play() {
    this.videoEl.play();
  }

  public pause() {
    this.videoEl.pause();
  }
}
