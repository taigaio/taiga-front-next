import { Project } from '@/app/api/projects/projects.model';

export interface IssueStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export interface IssueStatusInput {
  name: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export type IssueStatusPartialInput = Partial<IssueStatusInput>;

export type IssueStatusesOrderList = number[][];

export type IssueStatusExtraInfo = Pick<IssueStatus, 'color' | 'isClosed' | 'name'>;
