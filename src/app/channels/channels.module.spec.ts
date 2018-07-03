import { ChannelsModule } from './channels.module';

describe('ChannelsModule', () => {
  let channelsModule: ChannelsModule;

  beforeEach(() => {
    channelsModule = new ChannelsModule();
  });

  it('should create an instance', () => {
    expect(channelsModule).toBeTruthy();
  });
});
