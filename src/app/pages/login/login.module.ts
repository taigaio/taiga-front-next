/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
