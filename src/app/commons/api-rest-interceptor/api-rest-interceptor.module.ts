/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRestInterceptorService } from './api-rest-interceptor.service';
import { LocalStorageModule } from '../local-storage/local-storage.module';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptorService, multi: true },
  ],
  declarations: [],
  imports: [
    LocalStorageModule,
  ],
})
export class ApiRestInterceptorModule { }
