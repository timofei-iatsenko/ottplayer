import { PortalModule } from './portal.module';

describe('PortalModule', () => {
  let portalModule: PortalModule;

  beforeEach(() => {
    portalModule = new PortalModule();
  });

  it('should create an instance', () => {
    expect(portalModule).toBeTruthy();
  });
});
