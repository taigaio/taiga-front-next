import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { IssueTypesApiService } from './issue-types-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    IssueTypesApiService,
  ],
})
export class IssueTypesApiModule { }
