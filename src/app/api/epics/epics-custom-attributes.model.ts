/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Project } from '@/app/api/projects/projects.model';

export interface EpicCustomAttributeDetail {
  createdDate: string;
  description: string;
  extra: string | null;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  project: Project['id'];
  type: string;
}

export interface EpicCustomAttributeCreationData {
  name: string;
  project: Project['id'];
  description?: string;
  order?: number;
}

export type EpicCustomAttributePartialInput = Partial<EpicCustomAttributeDetail>;

export interface EpicCustomAttributeBulkUpdate {
  project: Project['id'];
  bulkEpicCustomAttributes: [number, number][];
}
