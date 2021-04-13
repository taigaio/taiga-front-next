import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersApiService } from './users-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    UsersApiService,
  ],
})
export class UsersApiModule { }
