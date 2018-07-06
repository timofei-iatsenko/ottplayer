import { PlayerModule } from './player.module';

describe('PlayerModule', () => {
  let playerModule: PlayerModule;

  beforeEach(() => {
    playerModule = new PlayerModule();
  });

  it('should create an instance', () => {
    expect(playerModule).toBeTruthy();
  });
});
