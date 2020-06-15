/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Application } from '../applications/application.model';

export interface ApplicationToken {
  application: Application;
  auth_code: string;
  id: number;
  next_url: string;
  user: number;
}

export interface AuthorizeInput {
  application: string;
  state: string;
}

export interface ValidateInput {
  application: string;
  auth_code: string;
  state: string;
}
