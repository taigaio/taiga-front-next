/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { User } from '@/app/api/users/users.model';

export type Voter = Pick<User, 'fullName' | 'id' | 'username'>;

