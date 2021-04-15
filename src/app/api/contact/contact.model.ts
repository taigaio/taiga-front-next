/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';
import { User } from '@/app/api/users/users.model';

export interface ContactProject {
  comment: string;
  createdDate: string;
  id: number;
  project: Project['id'];
  user: User['id'];
}
