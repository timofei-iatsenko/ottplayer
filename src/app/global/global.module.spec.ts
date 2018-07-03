import { GlobalModule } from './global.module';

describe('GlobalModule', () => {
  let globalModule: GlobalModule;

  beforeEach(() => {
    globalModule = new GlobalModule();
  });

  it('should create an instance', () => {
    expect(globalModule).toBeTruthy();
  });
});
