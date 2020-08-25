/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNavigationComponent } from './project-navigation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProjectNavigationComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [ProjectNavigationComponent],
})
export class ProjectNavigationModule { }
