/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TextEditorComponent } from './text-editor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UploadAdapterService } from './upload-adapter.service';
import { DataConversionService } from './data-conversion.service';
import { SearchApiService } from '@/app/api/search/search-api.service';
import { of } from 'rxjs';
import * as faker from 'faker';

describe('TextEditorComponent', () => {
  let spectator: Spectator<TextEditorComponent>;
  const projectSlug = 'taiga-next';
  const createComponent = createComponentFactory({
    component: TextEditorComponent,
    schemas: [ NO_ERRORS_SCHEMA ],
    mocks: [
      UploadAdapterService,
      DataConversionService,
      SearchApiService,
    ],
  });

  beforeEach(() => {
    spectator = createComponent(),
    spectator.component.projectSlug = projectSlug;
  });

  it('do no return wiki results', () => {
    const searchApiService = spectator.inject<SearchApiService>(SearchApiService);

    searchApiService.search.and.returnValue(of({
      count: 1,
      wikipages: [{
        id: faker.random.number(),
        slug: faker.lorem.slug,
      }],
    }));

    spectator.component.feedReferences('test').then((result) => {
      expect(result).toEqual([]);
    });
  });

  it('search results', () => {
    const searchApiService = spectator.inject<SearchApiService>(SearchApiService);

    const userstory = {
      ref: faker.random.number(),
      subject: faker.lorem.sentence(),
    };

    const issue = {
      ref: faker.random.number(),
      subject: faker.lorem.sentence(),
    };

    const task = {
      ref: faker.random.number(),
      subject: faker.lorem.sentence(),
    };

    searchApiService.search.and.returnValue(of({
      count: 4,
      wikipages: [
        {
          id: faker.random.number(),
          slug: faker.lorem.slug,
        },
      ],
      userstories: [userstory],
      issues: [issue],
      tasks: [task],
    }));

    spectator.component.feedReferences('test').then((result) => {
      expect(result).toEqual([
        {
          id: `#${userstory.ref}`,
          link: `project/${projectSlug}/t/${userstory.ref}`,
          listRenderText: `#${userstory.ref} - ${userstory.subject}`,
        },
        {
          id: `#${issue.ref}`,
          link: `project/${projectSlug}/t/${issue.ref}`,
          listRenderText: `#${issue.ref} - ${issue.subject}`,
        },
        {
          id: `#${task.ref}`,
          link: `project/${projectSlug}/t/${task.ref}`,
          listRenderText: `#${task.ref} - ${task.subject}`,
        },
      ]);
    });
  });
});
