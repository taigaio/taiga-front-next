/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as fromCurrentUser from '../reducers/current-user.reducer';
import { selectCurrentUserState } from './current-user.selectors';

describe('CurrentUser Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCurrentUserState({
      [fromCurrentUser.currentUserFeatureKey]: {},
    });

    expect(result).toEqual({ } as any);
  });
});
