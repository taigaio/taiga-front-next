/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Milestone } from '@/app/api/milestones/milestones.model';
import { Project } from '@/app/api/projects/projects.model';
import { User } from '@/app/api/users/users.model';
import { Userstory } from '@/app/api/userstories/userstories.model';

export interface Attachment {
  changes: {
    description: string[];
  };
  filename: string;
  thumbUrl: null | string;
  url: string;
}

export interface TimelineEntry {
  contentType: number;
  created: string;
  data: {
    comment: string;
    commentHtml: string;
    milestone: Pick<Milestone, 'id' |
    'name' |
    'slug'>
    project: Pick<Project, 'description' |
    'id' |
    'name' |
    'slug'>;
    user: Pick<User, 'bigPhoto' |
    'dateJoined' |
    'gravatarId' |
    'id' |
    'photo' |
    'username'> & {
      name: string;
      isProfileVisible: boolean;
    }
    userstory: Pick<Userstory, 'id' |
    'ref' |
    'subject'>;
    valuesDiff: {
      attachments: {
        changed: Attachment[];
        deleted: Attachment[];
        new: Attachment[];
      };
    };
  };
  dataContentType: number;
  eventType: string;
  id: number;
  namespace: string;
  objectId: number;
  project: Project['id'];
}
