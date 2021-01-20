/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
