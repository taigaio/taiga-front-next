import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { WikiPagesApiService } from './wiki-pages-api.service';
import { WikiLinksApiService } from './wiki-links-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    WikiPagesApiService,
    WikiLinksApiService,
  ],
})
export class WikiApiModule { }
