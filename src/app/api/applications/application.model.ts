/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Application {
  description: string;
  icon_url: null | string;
  id: string;
  name: string;
  web: string;
}

export interface ApplicationToken {
  application: Application;
  auth_code: string;
  id: number;
  next_url: string;
  user: number;
}
