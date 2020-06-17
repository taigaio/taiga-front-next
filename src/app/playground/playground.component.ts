/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StatsApiService } from '@/app/api/stats/stats-api.service';
import { Stats } from '@/app/api/stats/stats.model';
import { ResolverApiService } from '@/app/api/resolver/resolver-api.service';
import { ProjectResolver } from '@/app/api/resolver/resolver.model';
import { SearchApiService } from '../api/search/search-api.service';
import { UserStorageApiService } from '@/app/api/user-storage/user-storage-api.service';
import { MilestoneApiService } from '../api/milestones/milestones-api.service';
import { Milestone } from '../api/milestones/milestones.model';
import { EpicStatusesApiService } from '../api/epic-statuses/epic-statuses-api.service';
import { EpicStatus } from '../api/epic-statuses/epic-statuses.model';
import { UserstoryStatusesApiService } from '../api/userstory-statuses/userstory-statuses-api.service';
import { UserstoryStatus } from '../api/userstory-statuses/userstory-statuses.model';
import { PointsApiService } from '../api/points/points-api.service';
import { Points } from '../api/points/points.model';
import { TaskStatusesApiService } from '../api/task-statuses/task-statuses-api.service';
import { TaskStatus } from '../api/task-statuses/task-statuses.model';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  stats$!: Observable<Stats>;
  projectId$!: Observable<ProjectResolver>;
  milestones$!: Observable<Milestone[]>;
  epicStatuses$!: Observable<EpicStatus[]>;
  userstoryStatuses$!: Observable<UserstoryStatus[]>;
  points$: Observable<Points[]>;
  taskStatuses$!: Observable<TaskStatus[]>;

  constructor(
    private readonly statsApiService: StatsApiService,
    private readonly resolverApiService: ResolverApiService,
    private readonly searchApiService: SearchApiService,
    private readonly userStorageApiService: UserStorageApiService,
    private readonly milestoneApiService: MilestoneApiService,
    private readonly epicStatusesApiService: EpicStatusesApiService,
    private readonly userstoryStatusesApiService: UserstoryStatusesApiService,
    private readonly pointsApiService: PointsApiService,
    private readonly taskStatusesApiService: TaskStatusesApiService
  ) {
    this.stats$ = this.statsApiService.getDiscover();
    this.projectId$ = this.resolverApiService.project('taiga5');
  }

  querySearch() {
    this.searchApiService.search('1', 'Ability').subscribe(console.log);
  }

  public initData() {
    this.projectId$.subscribe((projectResolver) => {
      this.milestones$ = this.milestoneApiService.list(projectResolver.project);
      this.epicStatuses$ = this.epicStatusesApiService.list(projectResolver.project);
      this.userstoryStatuses$ = this.userstoryStatusesApiService.list(projectResolver.project);
      this.points$ = this.pointsApiService.list(projectResolver.project);
      this.taskStatuses$ = this.taskStatusesApiService.list(projectResolver.project);
    });
  }

  public listUserStorage() {
    this.userStorageApiService.list().subscribe(console.log);
  }

  ngOnInit(): void {
    this.initData();
  }

}
