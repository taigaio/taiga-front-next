/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface User {
  acceptedTerms: boolean;
  bigPhoto: string;
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
  roles: string[];
  theme: string;
  timezone: string;
  totalPrivateProjects: number;
  totalPublicProjects: number;
  username: string;
  uuid: string;
}

export interface UserStats {
  roles: string[];
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
