import { Project } from '@/app/api/projects/projects.model';

export interface IssueType {
  id: number;
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export interface IssueTypeInput {
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export type IssueTypePartialInput = Partial<IssueTypeInput>;

export type IssueTypesOrderList = number[][];
