/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Optional } from 'utility-types';

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
  attachedFile: File | Blob;
} & Pick<Attachment,
  'objectId' |
  'project' |
  'description' |
  'isDeprecated'>,
  'description' |
  'isDeprecated'>;
