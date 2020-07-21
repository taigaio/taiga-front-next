/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
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
