/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { ProjectLogoDirective } from './project-logo.directive';
import { ProjectMockFactory } from '@/app/api/projects/projects.model.mock';

describe('ProjectLogoDirective', () => {
  let spectator: SpectatorDirective<ProjectLogoDirective>;
  const createDirective = createDirectiveFactory(ProjectLogoDirective);

  it('big logo', () => {
    const project = ProjectMockFactory.build();

    spectator = createDirective(`<img [tgProjectLogo]="project" type="big" />`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.element.getAttribute('src')).toEqual(project.logoBigUrl);
  });

  it('small logo', () => {
    const project = ProjectMockFactory.build();

    spectator = createDirective(`<img [tgProjectLogo]="project" />`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.element.getAttribute('src')).toEqual(project.logoBigUrl);
  });

  it('default logo', () => {
    const project = {
      ...ProjectMockFactory.build(),
      logoSmallUrl: '',
      slug: 'fake-slug',
      id: 123,
    };

    spectator = createDirective(`<img [tgProjectLogo]="project" />`, {
      hostProps: {
        project,
      },
    });

    expect(spectator.element.getAttribute('src')).toContain('images/project-logos/project-logo-0');
    expect(spectator.element.getAttribute('style')).toEqual('background: rgb(164, 162, 219);');
  });
});
