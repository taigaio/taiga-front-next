/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { EpicsApiService } from './epics-api.service';
import { EpicsCustomAttributeApiService } from './epics-custom-attributes-api.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    EpicsApiService,
    EpicsCustomAttributeApiService,
  ],
})
export class EpicsApiModule { }
