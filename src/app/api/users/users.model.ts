/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Role } from '@/app/api/roles/roles.model';

export interface User {
  acceptedTerms: boolean;
  bigPhoto: string | null;
  bio: string;
  color: string;
  dateJoined: string;
  email: string;
  fullName: string;
  fullNameDisplay: string;
  gravatarId: string;
  id: number;
  isActive: boolean;
  lang: string;
  maxMembershipsPrivateProjects: number | null;
  maxMembershipsPublicProjects: number | null;
  maxPrivateProjects: number | null;
  maxPublicProjects: number | null;
  photo: string | null;
  readNewTerms: boolean;
  roles: Role['name'][];
  theme: string;
  timezone: string;
  totalPrivateProjects: number;
  totalPublicProjects: number;
  username: string;
  uuid: string;
}

export interface UserStats {
  roles: Role['name'][];
  totalNumClosedUserstories: number;
  totalNumContacts: number;
  totalNumProjects: number;
}

export type UserContact = Pick<User,
  'bigPhoto' |
  'bio' |
  'color' |
  'fullName' |
  'fullNameDisplay' |
  'gravatarId' |
  'id' |
  'isActive' |
  'lang' |
  'photo' |
  'roles' |
  'theme' |
  'timezone' |
  'username'
>;

export interface WatchedContentFilter {
  q?: string;
  type?: 'project' | 'userstory' | 'task' | 'issue';
}

export interface VotedContentFilter {
  q?: string;
  type?: 'userstory' | 'task' | 'issue';
}

export type UserExtraInfo = Pick<User,
  'id' |
  'bigPhoto' |
  'fullNameDisplay' |
  'gravatarId' |
  'isActive' |
  'photo' |
  'username'>;
