/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
