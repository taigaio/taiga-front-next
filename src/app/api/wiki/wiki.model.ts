/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
