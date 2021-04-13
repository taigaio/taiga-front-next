import { Project } from '@/app/api//projects/projects.model';

export interface Points {
  id: number;
  name: string;
  value: number | null;
  order: number;
  project: Project['id'];
}

export interface PointsInput {
  name: string;
  value: number | null;
  order: number;
  project: Project['id'];
}

export type PointsPartialInput = Partial<PointsInput>;

export type PointsOrderList = number[][];
