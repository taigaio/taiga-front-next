/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
