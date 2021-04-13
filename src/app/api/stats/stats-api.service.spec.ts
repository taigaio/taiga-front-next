import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { StatsApiService } from './stats-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

describe('StatsApiService', () => {
  let spectator: SpectatorHttp<StatsApiService>;
  const createHttp = createHttpFactory({
    service: StatsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get discover data', () => {
    spectator.service.getDiscover().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/stats/discover`, HttpMethod.GET);
  });
});
