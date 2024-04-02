/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extModules = [
    StoreDevtoolsModule.instrument({
        maxAge: 25,
    }),
];
