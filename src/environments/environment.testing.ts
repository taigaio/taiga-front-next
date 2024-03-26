/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  configLocal: {
    api: 'https://api.taiga.io/api/v1/',
    defaultLanguage: 'en',
  },
};
