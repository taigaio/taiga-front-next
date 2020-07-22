/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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

