/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Epic } from '@/app/api/epics/epics.model';

export interface EpicCustomAttributeValueDetail {
  attributesValues: Record<string, string>;
  epic: Epic['id'];
  version: number;
}

export type EpicCustomAttributeValueDetailPartialInput = Partial<EpicCustomAttributeValueDetail>;
