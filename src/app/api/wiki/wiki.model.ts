/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';
import { Watcher } from '@/app/api/commons/watcher.model';
export { Attachment, AttachmentCreationData } from '@/app/api/commons/attachment.model';

export interface WikiPage {
  content: string;
  readonly createdDate: string;
  readonly editions: number;
  readonly html: string;
  readonly id: number;
  readonly isWatcher: boolean;
  readonly lastModifier: number;
  readonly modifiedDate: string;
  readonly owner: number;
  project: Project['id'];
  readonly projectExtraInfo: Pick<Project,
    'id' |
    'logoSmallUrl' |
    'name' |
    'slug'>;
  slug: string;
  readonly totalWatchers: number;
  readonly version: number;
}

export type WikiPageCreationData = Pick<WikiPage,
  'project' |
  'slug' |
  'content'>;

export type { Watcher as WikiPageWatcher };

export interface WikiLink {
  href: string;
  id: number;
  order: number;
  project: Project['id'];
  title: string;
}

export type WikiLinkCreationData = Pick<WikiLink,
  'href' |
  'project' |
  'title'>
  & {orde?: number};
