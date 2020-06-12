/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '@/app/config.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly configService: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = this.configService.apiUrl;

    // Only add authorization to request through the api
    if (!req.url.startsWith(apiUrl)) {
      return next.handle(req);
    }

    const token = this.localStorageService.get<string>('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);
      })
    );
  }
}
