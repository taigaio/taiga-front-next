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

export default {
  title: 'Commons/ProjectNavigation',
  component: ProjectNavigationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        StoryBookTranslationModule(),
        ProjectNavigationModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<ProjectNavigationComponent> = (args: ProjectNavigationComponent) => ({
  template: `<tg-project-navigation></tg-project-navigation>`,
  props: args,
});

export const Default = Template.bind({});
