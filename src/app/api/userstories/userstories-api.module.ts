import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { UserstoriesApiService } from './userstories-api.service';
import { UserstoriesCustomAttributeApiService } from './userstories-custom-attribute-api.service';
import { UserstoriesCustomAttributeValuesApiService } from './userstories-custom-attribute-values-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    UserstoriesApiService,
    UserstoriesCustomAttributeApiService,
    UserstoriesCustomAttributeValuesApiService,
  ],
})
export class UserstoriesApiModule { }
