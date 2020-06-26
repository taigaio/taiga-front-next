/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Membership {
  color: string;
  created_at: string;
  email: string;
  fullName: string;
  gravatar_id: string;
  id: number;
  invitation_extra_text: string | null;
  invited_by: number | null;
  is_admin: boolean;
  is_owner: boolean;
  is_user_active: boolean;
  photo: string | null;
  project: number;
  project_name: string;
  project_slug: string;
  role: number;
  role_name: string;
  user: number;
  user_email: string;
  user_order: number;
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
