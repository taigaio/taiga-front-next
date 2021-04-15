/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { IssuesApiService } from './issues-api.service';
import { IssueCustomAttributeApiService } from './issue-custom-attribute-api.service';
import { IssueCustomAttributeValuesApiService } from './issue-custom-attribute-values-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    IssuesApiService,
    IssueCustomAttributeApiService,
    IssueCustomAttributeValuesApiService,
  ],
})
export class IssuesApiModule { }
