/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
