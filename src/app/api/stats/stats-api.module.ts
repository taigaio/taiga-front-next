import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StatsApiService } from './stats-api.service';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    StatsApiService,
  ],
})
export class StatsApiModule { }
