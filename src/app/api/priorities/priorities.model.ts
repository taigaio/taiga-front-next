import { Project } from '@/app/api/projects/projects.model';

export interface Priority {
  id: number;
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export interface PriorityInput {
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export type PriorityPartialInput = Partial<PriorityInput>;

export type PrioritiesOrderList = number[][];
