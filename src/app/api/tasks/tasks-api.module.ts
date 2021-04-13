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
