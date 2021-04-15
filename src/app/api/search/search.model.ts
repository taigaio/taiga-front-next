/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

export interface SearchResults {
  count: number;
  epics: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  issues: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  tasks: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  userstories: Array<{
    id: number;
    milestoneName: string;
    milestoneSlug: string;
    ref: number;
    status: number;
    subject: string;
    totalPoints: number;
  }>;
  wikipages: Array<{
    id: number;
    slug: string;
  }>;
}
