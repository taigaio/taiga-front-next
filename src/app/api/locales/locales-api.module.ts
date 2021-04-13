import { NgModule } from '@angular/core';
import { LocalesApiService } from './locales-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    LocalesApiService,
  ],
})
export class LocalesApiModule { }
