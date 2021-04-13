import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiRestInterceptorModule } from '@/app/commons/api-rest-interceptor/api-rest-interceptor.module';
import { TrelloImporterApiService } from './trello-importer-api.service';
import { GithubImporterApiService } from './github-importer-api.service';
import { JiraImporterApiService } from './jira-importer-api.service';
import { AsanaImporterApiService } from './asana-importer-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiRestInterceptorModule,
  ],
  providers: [
    TrelloImporterApiService,
    GithubImporterApiService,
    JiraImporterApiService,
    AsanaImporterApiService,
  ],
})
export class ImportersApiModule { }
