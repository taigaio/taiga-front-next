/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { WikiPage, AttachmentCreationData, Attachment, WikiLink } from './wiki.model';

export const WikiPageMockFactory = Factory.Sync.makeFactory<WikiPage>({
  content: faker.lorem.paragraphs(),
  createdDate: faker.date.recent().toString(),
  editions: faker.random.number(),
  html: faker.lorem.paragraphs(),
  id: faker.random.number(),
  isWatcher: faker.random.boolean(),
  lastModifier: faker.random.number(),
  modifiedDate: faker.date.recent().toString(),
  owner: faker.random.number(),
  project: faker.random.number(),
  projectExtraInfo: {
      id: faker.random.number(),
      logoSmallUrl: faker.image.imageUrl(),
      name: faker.random.word(),
      slug: faker.lorem.slug(),
  },
  slug: faker.lorem.slug(),
  totalWatchers: 0,
  version: faker.random.number(),
});

export const WikiPageAttachmentMockFactory = Factory.Sync.makeFactory<Attachment>({
  attachedFile: faker.image.imageUrl(),
  createdDate: faker.date.recent().toString(),
  description: faker.lorem.sentence(),
  fromComment: faker.random.boolean(),
  id: faker.random.number(),
  isDeprecated: faker.random.boolean(),
  modifiedDate: faker.date.recent().toString(),
  name: faker.system.fileName(),
  objectId: faker.random.number(),
  order: faker.random.number(),
  owner: faker.random.number(),
  previewUrl: faker.image.imageUrl(),
  project: faker.random.number(),
  sha1: faker.random.uuid(),
  size: faker.random.number(),
  thumbnailCardUrl: null,
  url: faker.image.imageUrl(),
});

export const WikiPageAttachmentCreationMockFactory = Factory.Sync.makeFactory<AttachmentCreationData>({
  objectId: faker.random.number(),
  project: faker.random.number(),
  attachedFile: new File([], faker.random.word()),
  description: faker.lorem.sentence(),
  isDeprecated: faker.random.boolean(),
});

export const WikiLinkMockFactory = Factory.Sync.makeFactory<WikiLink>({
  href: faker.lorem.slug(),
  id: faker.random.number(),
  order: faker.random.number(),
  project: faker.random.number(),
  title: faker.lorem.sentence(),
});
