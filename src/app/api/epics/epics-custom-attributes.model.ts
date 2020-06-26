/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface EpicCustomAttributeDetail {
  createdDate: string;
  description: string;
  extra: string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  project: number;
  type: string;
}

export interface EpicCustomAttributeCreationData {
  name: string;
  project: number;
  description?: string;
  order?: number;
}

export type EpicCustomAttributePartialInput = Partial<EpicCustomAttributeDetail>;

export interface EpicCustomAttributeBulkUpdate {
  project: number;
  bulkEpicCustomAttributes: [number, number][];
}
