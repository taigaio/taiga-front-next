/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Membership {
  color: string;
  createdAt: string;
  email: string;
  fullName: string;
  gravatarId: string;
  id: number;
  invitationExtraText: string | null;
  invitedBy: number | null;
  isAdmin: boolean;
  isOwner: boolean;
  isUserActive: boolean;
  photo: string | null;
  project: number;
  projectName: string;
  projectSlug: string;
  role: number;
  roleName: string;
  user: number;
  userEmail: string;
  userOrder: number;
}

export interface MembershipCreation {
  project: number;
  role: number;
  username: string;
}

export interface MemberInBulk {
  roleId: number;
  username: string;
}

export interface MembershipCreationInBulk {
  project: number;
  members: MemberInBulk[];
  invitationText?: string;
}

export type MembershipPartialInput = Partial<Membership>;
