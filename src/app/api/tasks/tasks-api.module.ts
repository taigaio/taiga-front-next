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
import { TasksApiService } from './tasks-api.service';
import { TaskCustomAttributesApiService } from './tasks-custom-attributes-api.service';
import { TasksCustomAttributesValueApiService } from './tasks-custom-attributes-value-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    TasksApiService,
    TaskCustomAttributesApiService,
    TasksCustomAttributesValueApiService,
  ]
})
export class TasksApiModule { }
