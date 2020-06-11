import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { AuthApiService } from './auth-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

describe('AuthApiService', () => {
  let spectator: SpectatorHttp<AuthApiService>;
  const createHttp = createHttpFactory({
    service: AuthApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());
  
  it('login', () => {
    const data = {
      type: 'normal',
      password: '123123',
      username: 'admin'
    }
    spectator.service.login(data).subscribe();
    const call = spectator.expectOne(`${ConfigServiceMock.apiUrl}/auth`, HttpMethod.POST);
    expect(call.request.body).toEqual(data);
  });
});