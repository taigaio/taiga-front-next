import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { ContactApiService } from './contact-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    ContactApiService,
  ],
})
export class ContactApiModule { }
