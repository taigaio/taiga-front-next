import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { ContactApiService } from './contact-api.service';

describe('ContactApiService', () => {
  let spectator: SpectatorHttp<ContactApiService>;
  const createHttp = createHttpFactory({
    service: ContactApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('contact project', () => {
    const data = {
      project: faker.random.number(),
      comment: faker.lorem.paragraph(),
    };

    spectator.service.contactProject(data.project, data.comment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/contact`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });
});
