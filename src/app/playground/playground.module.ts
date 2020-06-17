/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { StatsApiModule } from '@/app/api/stats/stats-api.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { ResolverApiModule } from '@/app/api/resolver/resolver-api.module';
import { SearchApiModule } from '../api/search/search-api.module';
import { UserStorageApiModule } from '@/app/api/user-storage/user-storage-api.module';
import { MilestonesApiModule } from '../api/milestones/milestones-api.module';
import { EpicStatusesApiModule } from '../api/epic-statuses/epic-statuses-api.module';
import { UserstoryStatusesApiModule } from '../api/userstory-statuses/userstory-statuses-api.module';
import { PointsApiModule } from '../api/points/points-api.module';

@NgModule({
  declarations: [
    PlaygroundComponent,
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    StatsApiModule,
    ResolverApiModule,
    UserStorageApiModule,
    MilestonesApiModule,
    ReactiveComponentModule,
    SearchApiModule,
    EpicStatusesApiModule,
    UserstoryStatusesApiModule,
    PointsApiModule,
  ],
})
export class PlaygroundModule { }
