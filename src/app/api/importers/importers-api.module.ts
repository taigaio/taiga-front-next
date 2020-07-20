/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

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
