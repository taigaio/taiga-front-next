/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { camelCase, snakeCase } from 'change-case';

import { ConfigService } from '@/app/config.service';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class ApiRestInterceptorService implements HttpInterceptor {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly configService: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = this.configService.apiUrl;
    let request = req;

    // Only add interceptors to request through the api
    if (!req.url.startsWith(apiUrl)) {
      return this.response(next, request);
    }

    request = this.authInterceptor(request);

    if (request instanceof HttpRequest) {
      request = this.snakeCaseRequestInterceptor(request);
    }

    return this.response(next, request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);
      })
    );
  }

  response(handler: HttpHandler, request: HttpRequest<any>) {
    return handler.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          return this.camelCaseResponseInterceptor(event);
        }

        return event;
      })
    );
  }

  private snakeCaseRequestInterceptor(request: HttpRequest<any>): HttpRequest<any> {
    let newRequest = request;

    if (newRequest.body) {
      const body = UtilsService.objKeysTransformer(newRequest.body, snakeCase);
      newRequest = newRequest.clone({ body });
    }

    if (newRequest.params) {
      let params = new HttpParams();

      newRequest.params.keys().forEach((key) => {
        const param = newRequest.params.get(key);

        if (param) {
          params = params.append(snakeCase(key), param);
        }
      });

      newRequest = newRequest.clone({ params });
    }

    return newRequest;
  }

  private camelCaseResponseInterceptor(event: HttpResponse<any>): HttpResponse<any> {
    const body = UtilsService.objKeysTransformer(event.body, camelCase);
    return event.clone({ body });
  }

  private authInterceptor(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.localStorageService.get<string>('token');

    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
        },
      });
    }

    return request;
  }
}
