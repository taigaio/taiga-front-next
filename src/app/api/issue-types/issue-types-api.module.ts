/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthInterceptorModule } from '@/app/commons/auth-interceptor/auth-interceptor.module';
import { IssueTypesApiService } from './issue-types-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AuthInterceptorModule,
  ],
  providers: [
    IssueTypesApiService,
  ],
})
export class IssueTypesApiModule { }
