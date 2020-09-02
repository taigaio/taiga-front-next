/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { ProjectNavigationComponent } from './project-navigation.component';
import { TranslatePipe } from '@ngx-translate/core';

import { Spectator, createHostFactory } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectMockFactory } from '@/app/api/projects/projects.model.mock';

describe('ProjectNavigationComponent', () => {
  let spectator: Spectator<ProjectNavigationComponent>;
  const createHost = createHostFactory({
    component: ProjectNavigationComponent,
    schemas: [ NO_ERRORS_SCHEMA ],
    declarations: [
      MockPipe(TranslatePipe),
    ],
  });

  it('videconference url', () => {
    const project = {
      ...ProjectMockFactory.build(),
      videoconferences: 'talky',
      videoconferencesExtraData: 'testExtraData',
    };

    spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.component.videoUrl).toEqual(`https://talky.io/${project.slug}-testextradata`);
  });

  it('jitsi videconference url replace dashes', () => {
    const project = {
      ...ProjectMockFactory.build(),
      videoconferences: 'jitsi',
      videoconferencesExtraData: 'test-extra-data',
      slug: 'project-slug-url',
    };

    spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.component.videoUrl).toEqual(`https://meet.jit.si/projectslugurltestextradata`);
  });


  it('custom url', () => {
    const custom = 'https://mycustom-url';

    const project = {
      ...ProjectMockFactory.build(),
      videoconferences: 'custom',
      videoconferencesExtraData: custom,
    };

    spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.component.videoUrl).toEqual(custom);
  });
});
