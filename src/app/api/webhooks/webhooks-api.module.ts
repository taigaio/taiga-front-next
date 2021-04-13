import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { WebhooksApiService } from './webhooks-api.service';
import { WebhooksLogsApiService } from './webhooks-logs-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    WebhooksApiService,
    WebhooksLogsApiService,
  ],
})
export class WebkooksApiModule { }
