import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { StatsModule } from '@/app/api/stats/stats.module';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    StatsModule,
    ReactiveComponentModule
  ],
})
export class PlaygroundModule { }
