import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { LocalesApiService } from './locales-api.service';

describe('LocalesApiService', () => {
  let spectator: SpectatorHttp<LocalesApiService>;
  const createHttp = createHttpFactory({
    service: LocalesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get locales', () => {
    spectator.service.get().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/locales`, HttpMethod.GET);
  });
});
