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
