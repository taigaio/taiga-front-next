/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { ProjectNavigationComponent } from './project-navigation.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';

import { Spectator, createHostFactory } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectMockFactory } from '@/app/api/projects/projects.model.mock';
import { LegacyService } from '@/app/commons/legacy/legacy.service';
import { of } from 'rxjs';
import { LegacyServiceMock } from '@/app/commons/legacy/legacy-service.mock';
import { Router } from '@angular/router';

describe('ProjectNavigationComponent', () => {
  let spectator: Spectator<ProjectNavigationComponent>;

  const createHost = createHostFactory({
    component: ProjectNavigationComponent,
    schemas: [ NO_ERRORS_SCHEMA ],
    declarations: [
      MockPipe(TranslatePipe),
    ],
    providers: [
      { provide: LegacyService, useClass: LegacyServiceMock },
    ],
    imports: [
      ReactiveComponentModule,
    ],
    mocks: [
      TranslateService,
      Router,
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

  describe('menu active', () => {
    const legacyServiceMockFactory = (section = '', breadcrumb: string[] = []) => {
      return {
        legacyState: of({}),
        getInjector() {
          return {
            get:  () => {
              return {
                sectionsBreadcrumb: {
                  toJS: () => breadcrumb,
                },
                section,
              };
            },
          };
        },
      };
    };

    it('backlog', () => {
        const project = {
          ...ProjectMockFactory.build(),
        };

        spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
          hostProps: {
            project,
          },
          providers: [
            {
              provide: LegacyService,
              useValue: legacyServiceMockFactory('backlog'),
            },
          ],
        });

        expect(spectator.component.section).toEqual('backlog');
    });

    it('backlog-kanban when only kanban is enabled', () => {
      const project = {
        ...ProjectMockFactory.build(),
        isKanbanActivated: true,
        isBacklogActivated: false,
      };

      spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
        hostProps: {
          project,
        },
        providers: [
          {
            provide: LegacyService,
            useValue: legacyServiceMockFactory('backlog-kanban'),
          },
        ],
      });

      expect(spectator.component.section).toEqual('kanban');
    });

    it('backlog-kanban when only backlog is enabled', () => {
      const project = {
        ...ProjectMockFactory.build(),
        isKanbanActivated: false,
        isBacklogActivated: true,
      };

      spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
        hostProps: {
          project,
        },
        providers: [
          {
            provide: LegacyService,
            useValue: legacyServiceMockFactory('backlog-kanban'),
          },
        ],
      });

      expect(spectator.component.section).toEqual('backlog');
    });

    it('backlog-kanban when is kanban child', () => {
      const project = {
        ...ProjectMockFactory.build(),
        isKanbanActivated: true,
        isBacklogActivated: true,
      };

      spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
        hostProps: {
          project,
        },
        providers: [
          {
            provide: LegacyService,
            useValue: legacyServiceMockFactory('backlog-kanban', ['backlog', 'kanban']),
          },
        ],
      });

      expect(spectator.component.section).toEqual('kanban');
    });

    it('backlog-kanban when is backlog child', () => {
      const project = {
        ...ProjectMockFactory.build(),
        isKanbanActivated: true,
        isBacklogActivated: true,
      };

      spectator = createHost(`<tg-project-navigation [project]="project"></tg-project-navigation>`, {
        hostProps: {
          project,
        },
        providers: [
          {
            provide: LegacyService,
            useValue: legacyServiceMockFactory('backlog-kanban', ['kanban', 'backlog']),
          },
        ],
      });

      expect(spectator.component.section).toEqual('backlog');
    });
  });
});
