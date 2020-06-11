/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCurrentUser from './reducers/current-user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrentUserEffects } from './effects/current-user.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.reducer),
    EffectsModule.forFeature([CurrentUserEffects]),
  ],
})
export class CurrentUserModule { }
