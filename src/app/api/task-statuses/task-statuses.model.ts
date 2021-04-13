import { Project } from '@/app/api/projects/projects.model';

export interface TaskStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export interface TaskStatusInput {
  name: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export type TaskStatusPartialInput = Partial<TaskStatusInput>;

export type TaskStatusesOrderList = number[][];

export type TaskStatusExtraInfo = Pick<TaskStatus, 'color' | 'isClosed' | 'name'>;
