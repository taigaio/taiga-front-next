import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { TaskStatusesApiService } from './task-statuses-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    TaskStatusesApiService,
  ],
})
export class TaskStatusesApiModule { }
