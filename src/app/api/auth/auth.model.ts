/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { User } from '@/app/api/users/users.model';

export interface Auth extends User {
  authToken: string;
}

export interface LoginInput {
  password?: string;
  type: 'normal' | 'github';
  username?: string;
  code?: string;
}

export interface PublicRegistryInput {
  type: 'public';
  username: string;
  password: string;
  email: string;
  fullName: string;
  acceptedTerms: boolean;
}

export interface PrivateRegistryInput {
  type: 'private';
  existing: boolean;
  token: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
}
