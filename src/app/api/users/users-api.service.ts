/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { User, UserStats, UserContact, VotedContentFilter, WatchedContentFilter } from './users.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class UsersApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/users`;
  }

  public list(projectId: number) {
    return this.http.get<User[]>(this.base, {
      params: UtilsService.buildQueryParams({
        project: projectId,
      }),
    });
  }

  public get(userId: number) {
    return this.http.get<User>(`${this.base}/${userId}`);
  }

  public me() {
    return this.http.get<User>(`${this.base}/me`);
  }

  public stats(userId: number) {
    return this.http.get<UserStats>(`${this.base}/${userId}/stats`);
  }

  public getWatchedContent(userId: number, params: WatchedContentFilter) {
    return this.http.get<User>(`${this.base}/${userId}/watched`, {
      params: UtilsService.buildQueryParams(params),
    });
  }

  public getLikedContent(userId: number, q: string) {
    return this.http.get<User>(`${this.base}/${userId}/liked`, {
      params: UtilsService.buildQueryParams({
        q,
      }),
    });
  }

  public getVotedContent(userId: number, params: VotedContentFilter) {
    return this.http.get<User>(`${this.base}/${userId}/voted`, {
      params: UtilsService.buildQueryParams(params),
    });
  }

  public patch(userId: number, user: Partial<User>) {
    return this.http.patch<User>(`${this.base}/${userId}`, user);
  }

  public put(userId: number, user: User) {
    return this.http.put<User>(`${this.base}/${userId}`, user);
  }

  public delete(userId: number) {
    return this.http.delete(`${this.base}/${userId}`);
  }

  public getContacts(userId: number) {
    return this.http.get<UserContact[]>(`${this.base}/${userId}/contacts`);
  }

  public cancel(cancelToken: string) {
    return this.http.post<User>(`${this.base}/cancel`, {
      cancelToken,
    });
  }

  public changeAvatar(avatar: File) {
    const formData = UtilsService.buildFormData({
      avatar,
    });

    return this.http.post<User>(`${this.base}/change_avatar`, formData);
  }

  public removeAvatar() {
    return this.http.post<User>(`${this.base}/remove_avatar`, null);
  }

  public changeEmail(emailToken: string) {
    return this.http.post<User>(`${this.base}/change_email`, {
      emailToken,
    });
  }

  public changePassword(currentPassword: string, password: string) {
    return this.http.post(`${this.base}/change_password`, {
      currentPassword,
      password,
    });
  }

  public passwordRecovery(username: string) {
    return this.http.post<{detail: string}>(`${this.base}/password_recovery`, {
      username,
    });
  }

  public changePasswordFromRecovery(token: string, password: string) {
    return this.http.post(`${this.base}/change_password_from_recovery`, {
      token,
      password,
    });
  }
}
