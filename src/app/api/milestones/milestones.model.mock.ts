/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { UserstoryMockFactory } from '@/app/api/userstories/userstories.model.mock';

import { Milestone } from './milestones.model';

export const MilestoneMockFactory = Factory.Sync.makeFactory<Milestone>({
    closed: faker.random.boolean(),
    closedPoints: faker.random.number(),
    createdDate: faker.date.past().toString(),
    disponibility: faker.random.number(),
    estimatedFinish: faker.date.future().toString(),
    estimatedStart: faker.date.recent().toString(),
    id: faker.random.number(),
    modifiedDate: faker.date.recent().toString(),
    name: faker.random.word(),
    order: faker.random.number(),
    owner: faker.random.number(),
    project: faker.random.number(),
    projectExtraInfo: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    totalPoints: faker.random.number(),
    userStories: [
      UserstoryMockFactory.build({id: faker.random.number()}),
      UserstoryMockFactory.build({id: faker.random.number()}),
    ],
});

