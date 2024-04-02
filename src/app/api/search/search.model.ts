/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
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
