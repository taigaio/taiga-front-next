import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    AuthApiService,
  ],
})
export class AuthApiModule { }
