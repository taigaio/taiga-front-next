/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface NotifyPolicyDetail {
  id: number;
  live_notify_level: number;
  project: number;
  project_name: string;
  web_notify_level: boolean;
}
