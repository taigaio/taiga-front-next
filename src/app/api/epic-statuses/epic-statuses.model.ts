import { Project } from '@/app/api/projects/projects.model';

export interface EpicStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export interface EpicStatusInput {
  name: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export type EpicStatusPartialInput = Partial<EpicStatusInput>;

export type EpicStatusesOrderList = number[][];

export type EpicStatusExtraInfo = Pick<EpicStatus, 'color' | 'isClosed' | 'name'>;
