/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { of } from 'rxjs';

export class LegacyServiceMock {
  _breadcrumb = [];
  _section = '';

  legacyState = of({});

  getInjector() {
    return {
      get:  () => {
        return {
          sectionsBreadcrumb: {
            toJS: () => this._breadcrumb,
          },
          section: this._section,
        };
      },
    };
  }
}
