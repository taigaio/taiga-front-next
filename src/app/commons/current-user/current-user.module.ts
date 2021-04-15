/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CurrentUserApiModule } from '@/app/api/current-user/current-user-api.module';
import { CurrentUserEffects } from './effects/current-user.effects';
import * as fromCurrentUser from './reducers/current-user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CurrentUserApiModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.reducer),
    EffectsModule.forFeature([CurrentUserEffects]),
  ],
})
export class CurrentUserModule { }
