/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Project } from '@/app/api//projects/projects.model';

export interface WebhookDetail {
  id: number;
  project: Project['id'];
  key: string;
  logsCounter: number;
  name: string;
  url: string;
}

export type WebhookCreationData = Pick<WebhookDetail, 'project' | 'name' | 'url' | 'key'>;

export interface WebhookLog {
  errorMessage: string;
}
