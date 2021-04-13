import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRestInterceptorService } from './api-rest-interceptor.service';
import { LocalStorageModule } from '../local-storage/local-storage.module';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptorService, multi: true },
  ],
  declarations: [],
  imports: [
    LocalStorageModule,
  ],
})
export class ApiRestInterceptorModule { }
