import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ConfigService } from '@/app/config.service';
import { EnvironmentService } from './environment.service';
import { Config } from './models/config.model';

describe('ConfigService', () => {
  const fakeConfig: Config = {
    api: 'http://fake',
    defaultLanguage: 'en',
  };

  let spectator: SpectatorHttp<ConfigService>;
  const createHttp = createHttpFactory({
    service: ConfigService,
    mocks: [ EnvironmentService ],
  });

  beforeEach(() => spectator = createHttp());

  it('fetch local config', () => {
    const mockedEnviorement = spectator.inject(EnvironmentService);

    mockedEnviorement.getEnvironment.and.returnValue({
      configLocal: fakeConfig,
    });

    spectator.service.fetch().then(() => {
      expect(spectator.service.config).toEqual(fakeConfig);
    });
  });

  it('fetch remote config', () => {
    const configRemote = 'http://fake-config-location';
    const mockedEnviorement = spectator.inject(EnvironmentService);

    mockedEnviorement.getEnvironment.and.returnValue({
      configRemote,
    });

    spectator.service.fetch().then(() => {
      expect(spectator.service.config).toEqual(fakeConfig);
    });

    const req = spectator.expectOne(configRemote, HttpMethod.GET);

    req.flush(fakeConfig);
  });
});
