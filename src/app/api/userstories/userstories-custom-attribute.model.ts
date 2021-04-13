import { Userstory } from './userstories.model';
import { Project } from '@/app/api/projects/projects.model';

export interface UserstoryCustomAttribute {
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

export interface UserstoryCustomAttributeCreationData {
  name: string;
  description?: string;
  order?: number;
  project: Project['id'];
}

export interface UserstoryCustomAttributeValues {
  attributesValues: Record<string, string>;
  userStory: Userstory['id'];
  version: number;
}
