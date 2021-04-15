/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
