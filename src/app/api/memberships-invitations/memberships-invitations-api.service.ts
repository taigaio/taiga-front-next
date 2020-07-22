/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@/app/config.service';
import { Membership, MembershipPartialInput, MembershipCreation, MembershipCreationInBulk } from './memberships-invitations.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';


@Injectable()
export class MembershipsInvitationsApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/memberships`;
  }

  public list(project?: number, role?: number) {
    return this.http.get<Membership[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...(project && { project }),
        ...(role && { role }),
      }),
    });
  }

  public create(data: MembershipCreation) {
    const input = {
      project: data.project.toString(),
      role: data.role.toString(),
      username: data.username,
    };

    return this.http.post<Membership>(this.base, input);
  }

  public bulkCreate(data: MembershipCreationInBulk) {

    const bulkInvites = data.members.map((member: { roleId: number, username: string }) => {
      return {
        roleId: member.roleId,
        username: member.username,
      };
    });

    const input = {
      projectId: data.project,
      bulkMemberships: bulkInvites,
      ...(data.invitationText && {invitationExtraText: data.invitationText}),
    };

    return this.http.post<Membership>(this.base, input);
  }

  public get(id: number) {
    return this.http.get<Membership>(`${this.base}/${id}`);
  }

  public put(id: number, data: Membership) {
    return this.http.put<Membership>(`${this.base}/${id}`, data);
  }

  public patch(id: number, data: MembershipPartialInput) {
    return this.http.patch<Membership>(`${this.base}/${id}`, data);
  }

  public delete(id: number) {
    return this.http.delete<Membership>(`${this.base}/${id}`);
  }

  public resendInvitation(id: number) {
    return this.http.post<Membership>(`${this.base}/${id}/resend_invitation`, {});
  }

  public getInvitation(invitationId: number) {
    return this.http.get<Membership>(`${this.config.apiUrl}/invitations/${invitationId}`);
  }
}
