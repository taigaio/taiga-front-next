/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
