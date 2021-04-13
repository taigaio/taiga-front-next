import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { ProjectTemplate } from './project-templates.model';

export const ProjectTemplateMockFactory = Factory.Sync.makeFactory<ProjectTemplate>({
  createdDate: faker.date.past().toISOString(),
  defaultOptions: {
    epicStatus: '',
    usStatus: '',
    points: '',
    taskStatus: '',
    issueStatus: '',
    issueType: '',
    priority: '',
    severity: '',
  },
  defaultOwnerRole: '',
  description: faker.lorem.paragraph(),
  epicStatuses: [],
  id: faker.random.number(),
  isBacklogActivated: faker.random.boolean(),
  isContactActivated: faker.random.boolean(),
  isEpicsActivated: faker.random.boolean(),
  isIssuesActivated: faker.random.boolean(),
  isKanbanActivated: faker.random.boolean(),
  isWikiActivated: faker.random.boolean(),
  issueStatuses: [],
  issueTypes: [],
  modifiedDate: faker.date.past().toISOString(),
  name: faker.lorem.words(),
  order: faker.random.number(),
  points: [],
  priorities: [],
  roles: [],
  severities: [],
  slug: faker.lorem.slug(),
  taskStatuses: [],
  usStatuses: [],
  videoconferences: null,
  videoconferencesExtraData: '',
});
