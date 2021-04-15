/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Attachment } from '@/app/api/commons/attachment.model';
import { User } from '@/app/api/users/users.model';

export interface HistoryEntry {
  comment: string;
  commentHtml: string;
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
