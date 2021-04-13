import { Project } from '@/app/api/projects/projects.model';

export interface Severity {
  id: number;
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export interface SeverityInput {
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export type SeverityPartialInput = Partial<SeverityInput>;

export type SeveritiesOrderList = number[][];
