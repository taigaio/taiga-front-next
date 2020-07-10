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
import { ContactProject } from './contact.model';

@Injectable()
export class ContactApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/contact`;
  }

  public contactProject(projectId: number, comment: string) {
    return this.http.post<ContactProject>(this.base, {
      project: projectId,
      comment,
    });
  }
}
