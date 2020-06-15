/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface SearchResults {
  count: number;
  epics: Array<{
    assigned_to: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  issues: Array<{
    assigned_to: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  tasks: Array<{
    assigned_to: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  userstories: Array<{
    id: number;
    milestone_name: string;
    milestone_slug: string;
    ref: number;
    status: number;
    subject: string;
    total_points: number;
  }>;
  wikipages: Array<{
    id: number;
    slug: string;
  }>;
}
