/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';

import { EpicsApiService } from './epics-api.service';
import { EpicsCustomAttributeApiService } from './epics-custom-attributes-api.service';
import { EpicsCustomAttributesValuesApiService } from './epics-custom-attributes-values-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    EpicsApiService,
    EpicsCustomAttributeApiService,
    EpicsCustomAttributesValuesApiService,
  ],
})
export class EpicsApiModule { }
