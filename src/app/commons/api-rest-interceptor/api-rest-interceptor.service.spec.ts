/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { RouterTestingModule } from '@angular/router/testing';
import { ApiRestInterceptorService } from './api-rest-interceptor.service';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { HTTP_INTERCEPTORS, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiRestInterceptor', () => {
  let spectator: SpectatorHttp<ApiRestInterceptorService>;
  const createService = createHttpFactory({
    service: ApiRestInterceptorService,
    imports: [
      RouterTestingModule,
    ],
    mocks: [
      LocalStorageService,
    ],
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiRestInterceptorService,
        multi: true,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('add authorization', () => {
    const token = faker.random.uuid();

    const localStorageService = spectator.inject(LocalStorageService);
    localStorageService.get.and.returnValue(token);

    const authInterceptorService = spectator.inject(ApiRestInterceptorService);
    const apiRequest = new HttpRequest('GET', ConfigServiceMock.apiUrl);

    const next = {
      handle(request: HttpRequest<any>) {
        expect(request.headers.get('Authorization')).toEqual(`Bearer ${ token }`);

        return of(new HttpResponse({ status: 200 }));
      },
    };

    authInterceptorService.intercept(apiRequest, next).subscribe();
  });

  it('snake case request', () => {
    const userId = faker.random.number();

    const authInterceptorService = spectator.inject(ApiRestInterceptorService);
    const apiRequest = new HttpRequest(
      'POST',
      ConfigServiceMock.apiUrl, {
        theUser: {
          userId,
        },
      },
      {
        params: new HttpParams({
          fromObject: {
            snakeCaseKey: 'test',
          },
        }),
      }
    );

    const next = {
      handle(request: HttpRequest<any>) {
        expect(request.body).toEqual({
          the_user: {
            user_id: userId,
          },
        });

        expect(request.params.get('snake_case_key')).toBeTruthy();

        return of(new HttpResponse({ status: 200 }));
      },
    };

    authInterceptorService.intercept(apiRequest, next).subscribe();
  });

  it('camel case response', () => {
    const userId = faker.random.number();

    const authInterceptorService = spectator.inject(ApiRestInterceptorService);
    const apiResponse = new HttpResponse({
      url: ConfigServiceMock.apiUrl,
      body: {
        theUser: {
          user_id: userId,
        },
      },
    });

    const next = {
      handle: () => {
        return of(new HttpResponse({ status: 200 }));
      },
    };

    authInterceptorService.intercept(apiResponse, next).subscribe((response: HttpResponse<any>) => {
      expect(response.body).toEqual({
        theUser: {
          userId,
        },
      });
    });
  });
});
