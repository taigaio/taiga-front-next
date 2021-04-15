/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import * as fromLogin from './reducers/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { AuthApiModule } from '@/app/api/auth/auth-api.module';
import { LocalStorageModule } from '@/app/commons/local-storage/local-storage.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LocalStorageModule,
    AuthApiModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule { }
