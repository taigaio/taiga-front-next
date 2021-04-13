import { Issue } from './issues.model';
import { Project } from '@/app/api/projects/projects.model';

export interface  IssueCustomAttribute {
  createdDate: string;
  description: string;
  extra: null | string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  project: Project['id'];
  type: string;
}

export interface IssueCustomAttributeCreationData {
  name: string;
  description?: string;
  order?: number;
  project: Project['id'];
}

export interface IssueCustomAttributeValues {
  attributesValues: Record<string, string>;
  issue: Issue['id'];
  version: number;
}
