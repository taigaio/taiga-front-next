/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { camelCase, snakeCase } from 'change-case';

import { ConfigService } from '@/app/config.service';

type TranformerInput = object | ArrayLike<unknown>;

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
    if (request.body) {
      const body = this.objKeysTransformer(request.body, snakeCase);
      return request.clone({ body });
    }

    return request;
  }

  private camelCaseResponseInterceptor(event: HttpResponse<any>): HttpResponse<any> {
    const body = this.objKeysTransformer(event.body, camelCase);
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

  private objKeysTransformer(input: TranformerInput, transformerFn: (input: TranformerInput) => string): TranformerInput {
    if (Array.isArray(input)) {
      return input.map((it) => {
        return this.objKeysTransformer(it, transformerFn);
      });
    } else {
      return Object.fromEntries(
        Object.entries(input).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return [transformerFn(key), this.objKeysTransformer(value, transformerFn)];
          }

          return [transformerFn(key), value];
        })
      );
    }
  }
}
