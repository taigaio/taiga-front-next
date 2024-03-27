/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos INC
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
