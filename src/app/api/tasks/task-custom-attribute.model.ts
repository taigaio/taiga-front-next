import { Task } from './tasks.model';
import { Project } from '@/app/api/projects/projects.model';

export interface  TaskCustomAttribute {
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

export interface TaskCustomAttributeCreationData {
  name: string;
  description?: string;
  order?: number;
  project: Project['id'];
}

export interface TaskCustomAttributeValues {
  attributesValues: Record<string, string>;
  task: Task['id'];
  version: number;
}
