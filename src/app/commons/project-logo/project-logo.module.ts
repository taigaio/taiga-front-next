/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { NgModule } from '@angular/core';
import { ProjectLogoDirective } from './project-logo.directive';

@NgModule({
  declarations: [ProjectLogoDirective],
  imports: [],
  exports: [
    ProjectLogoDirective,
  ],
})
export class ProjectLogoModule { }
