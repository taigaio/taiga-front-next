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
import { Points, PointsInput, PointsPartialInput, PointsOrderList } from './points.model';

@Injectable()
export class PointsApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/points`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<Points[]>(this.base, {
      params: query,
    });
  }

  public get(pointsId: number) {
    return this.http.get<Points>(`${this.base}/${pointsId}`);
  }

  public create(data: PointsInput) {
    return this.http.post<Points>(this.base, data);
  }

  public put(pointsId: number, data: Points) {
    return this.http.put<Points>(`${this.base}/${pointsId}`, data);
  }

  public patch(pointsId: number, data: PointsPartialInput) {
    return this.http.patch<Points>(`${this.base}/${pointsId}`, data);
  }

  public delete(pointsId: number) {
    return this.http.delete(`${this.base}/${pointsId}`);
  }

  public updateOrderInBulk(project: number, newOrder: PointsOrderList) {
    const data = {
      bulkPoints: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }

}
