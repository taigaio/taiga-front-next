import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';

import { EpicsApiService } from './epics-api.service';
import { EpicsCustomAttributeApiService } from './epics-custom-attributes-api.service';
import { EpicsCustomAttributesValuesApiService } from './epics-custom-attributes-values-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    EpicsApiService,
    EpicsCustomAttributeApiService,
    EpicsCustomAttributesValuesApiService,
  ],
})
export class EpicsApiModule { }
