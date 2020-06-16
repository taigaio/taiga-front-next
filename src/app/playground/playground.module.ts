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

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    StatsApiModule,
    ResolverApiModule,
    ReactiveComponentModule,
  ],
})
export class PlaygroundModule { }
