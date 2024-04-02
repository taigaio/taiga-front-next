/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Application } from '../applications/application.model';

export interface ApplicationToken {
  application: Application;
  authCode: string;
  id: number;
  nextUrl: string;
  user: number;
}

export interface AuthorizeInput {
  application: string;
  state: string;
}

export interface ValidateInput {
  application: string;
  authCode: string;
  state: string;
}
