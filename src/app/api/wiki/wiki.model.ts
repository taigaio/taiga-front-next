/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Optional } from 'utility-types';
import { Project } from '@/app/api/projects/projects.model';
import { User } from '@/app/api/users/users.model';

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
  project: number;
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

export type WikiPageWatcher = Pick<User, 'fullName' | 'id' | 'username'>;

export interface Attachment {
  attachedFile: string;
  createdDate: string;
  description: string;
  fromComment: boolean;
  id: number;
  isDeprecated: boolean;
  modifiedDate: string;
  name: string;
  objectId: number;
  order: number;
  owner: number;
  previewUrl: string;
  project: number;
  sha1: string;
  size: number;
  thumbnailCardUrl: null | string;
  url: string;
}

export type AttachmentCreationData = Optional<{
  attachedFile: File;
} & Pick<Attachment,
  'objectId' |
  'project' |
  'description' |
  'isDeprecated'>,
  'description' |
  'isDeprecated'>;


export interface WikiLink {
  href: string;
  id: number;
  order: number;
  project: number;
  title: string;
}

export type WikiLinkCreationData = Pick<WikiLink,
  'href' |
  'project' |
  'title'>
  & {orde?: number};
