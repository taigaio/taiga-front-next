/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
