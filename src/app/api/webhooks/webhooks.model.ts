import { Project } from '@/app/api//projects/projects.model';

export interface WebhookDetail {
  id: number;
  project: Project['id'];
  key: string;
  logsCounter: number;
  name: string;
  url: string;
}

export type WebhookCreationData = Pick<WebhookDetail, 'project' | 'name' | 'url' | 'key'>;

export interface WebhookLog {
  errorMessage: string;
}
