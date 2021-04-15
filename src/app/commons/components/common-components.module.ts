/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TgButtonComponent } from './button/button.component';
import { TgLoadingComponent } from './loading/loading.component';
import { TgCheckboxComponent } from './forms/checkbox/checkbox.component';

@NgModule({
  declarations: [
    TgButtonComponent,
    TgLoadingComponent,
    TgCheckboxComponent,
  ],
  exports: [
    TgButtonComponent,
    TgLoadingComponent,
    TgCheckboxComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CommonComponentsModule { }
