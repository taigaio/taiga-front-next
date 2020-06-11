/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as fromCurrentUser from './current-user.actions';

describe('loadCurrentUser', () => {
  it('should return an action', () => {
    expect(fromCurrentUser.loadCurrentUser().type).toBe('[CurrentUser] Load CurrentUser');
  });
});
