/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
