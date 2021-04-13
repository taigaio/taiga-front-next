import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { MembershipsInvitationsApiService } from './memberships-invitations-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    MembershipsInvitationsApiService,
  ],
})
export class MembershipsInvitationsApiModule { }
