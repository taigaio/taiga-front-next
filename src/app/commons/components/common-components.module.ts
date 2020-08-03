/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
