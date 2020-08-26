/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { ProjectNavigationModule } from '@/app/commons/project-navigation/project-navigation.module';
import { ProjectNavigationComponent } from '@/app/commons/project-navigation/project-navigation.component';
import { StoryBookTranslationModule } from './utils/translate-local-loader';
import { ProjectMockFactory } from '@/app/api/projects/projects.model.mock';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

export default {
  title: 'Commons/ProjectNavigation',
  component: ProjectNavigationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}],
      imports: [
        StoryBookTranslationModule(),
        // Presvent storybook error "Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'iframe.html'"
        RouterModule.forRoot([], { useHash: true }),
        ProjectNavigationModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<ProjectNavigationComponent> = (args: ProjectNavigationComponent) => ({
  template: `
    <tg-project-navigation [project]="project"></tg-project-navigation>
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
  },
};
