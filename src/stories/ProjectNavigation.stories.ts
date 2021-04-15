/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Story } from '@storybook/angular/types-6-0';

import { ProjectNavigationModule } from '@/app/commons/project-navigation/project-navigation.module';
import { ProjectNavigationComponent } from '@/app/commons/project-navigation/project-navigation.component';
import { ProjectMockFactory } from '@/app/api/projects/projects.model.mock';
import { ConfigureStory } from './utils/stories-helper';

export default ConfigureStory({
  title: 'Commons/ProjectNavigation',
  component: ProjectNavigationComponent,
  extraModules: [ProjectNavigationModule],
});

const Template: Story<ProjectNavigationComponent> = (args: ProjectNavigationComponent) => ({
  template: `
    <tg-project-navigation [project]="project"></tg-project-navigation>
    <tg-svg-sprite></tg-svg-sprite>
  `,
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  project: {
    ...ProjectMockFactory.build(),
    isEpicsActivated: true,
    isBacklogActivated: true,
    isKanbanActivated: true,
    isIssuesActivated: true,
    isWikiActivated: true,
    videoconferences: 'talky',
  },
};
