/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { User } from '../users/users.model';

export interface Attachment {
  attachedFile: string;
  description: string;
  filename: string;
  id: number;
  isDeprecated: boolean;
  order: number;
  thumbnailFile: null | string;
  url: string;
}

export interface HistoryEntry {
  comment: string;
  comment_html: string;
  createdAt: string;
  deleteCommentDate: null | string;
  deleteCommentUser: null | string;
  diff: {
    attachments: Attachment[][];
    sprintOrder: number[];
  };
  editCommentDate: null | string;
  id: string;
  isHidden: boolean;
  isSnapshot: boolean;
  key: string;
  snapshot: null | string;
  type: number;
  user: Pick<User, 'gravatarId' |
  'isActive' |
  'photo' |
  'username'> & {
    name: string;
    pk: number;
  };
  values: {
      users: Record<string, User>;
  };
  valuesDiff: {
    sprintOrder: number[];
  };
}

export type HistoryEntryType = 'userstory' | 'task' | 'issue' | 'wikipage';

export interface HistoryEntryComment {
  comment: string;
  commentHtml: string;
  date: string;
  user: Pick<User , 'bigPhoto' |
  'bio' |
  'color' |
  'fullName' |
  'fullNameDisplay' |
  'gravatarId' |
  'id' |
  'isActive' |
  'lang' |
  'photo' |
  'roles' |
  'theme' |
  'timezone' |
  'username'>;
}
