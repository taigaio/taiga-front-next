/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
import { IssueStatusesApiService } from '../api/issue-statuses/issue-statuses-api.service';
import { IssueStatus } from '../api/issue-statuses/issue-statuses.model';
import { IssueTypesApiService } from '../api/issue-types/issue-types-api.service';
import { IssueType } from '../api/issue-types/issue-types.model';
import { PrioritiesApiService } from '../api/priorities/priorities-api.service';
import { Priority } from '../api/priorities/priorities.model';
import { SeveritiesApiService } from '../api/severities/severities-api.service';
import { Severity } from '../api/severities/severities.model';
import { ProjectsApiService } from '@/app/api/projects/projects-api.service';
import { ProjectsListOrderBy, Project } from '@/app/api/projects/projects.model';
import { MembershipsInvitationsApiService } from '@/app/api/memberships-invitations/memberships-invitations-api.service';
import { Membership } from '@/app/api/memberships-invitations/memberships-invitations.model';
import { EpicsApiService } from '@/app/api/epics/epics-api.service';
import { Epic } from '@/app/api/epics/epics.model';
import { UserstoriesApiService } from '@/app/api/userstories/userstories-api.service';
import { UserstoryList } from '@/app/api/userstories/userstories.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tg-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {

  public exampleForm: FormGroup;

  constructor(
    private readonly statsApiService: StatsApiService,
    private readonly resolverApiService: ResolverApiService,
    private readonly userStorageApiService: UserStorageApiService,
    private readonly searchApiService: SearchApiService,
    private readonly milestoneApiService: MilestoneApiService,
    private readonly epicStatusesApiService: EpicStatusesApiService,
    private readonly userstoryStatusesApiService: UserstoryStatusesApiService,
    private readonly pointsApiService: PointsApiService,
    private readonly taskStatusesApiService: TaskStatusesApiService,
    private readonly issueStatusesApiService: IssueStatusesApiService,
    private readonly issueTypesApiService: IssueTypesApiService,
    private readonly prioritiesApiService: PrioritiesApiService,
    private readonly severitiesApiService: SeveritiesApiService,
    private readonly projectsApiService: ProjectsApiService,
    private readonly membershipsInvitationsApiService: MembershipsInvitationsApiService,
    private readonly epicApiService: EpicsApiService,
    private readonly userstoriesApiService: UserstoriesApiService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {
    this.stats$ = this.statsApiService.getDiscover();
    this.projectId$ = this.resolverApiService.project('taiganext');
  }

  stats$!: Observable<Stats>;
  projectId$!: Observable<ProjectResolver>;
  milestones$!: Observable<Milestone[]>;
  epicStatuses$!: Observable<EpicStatus[]>;
  userstoryStatuses$!: Observable<UserstoryStatus[]>;
  points$: Observable<Points[]>;
  taskStatuses$!: Observable<TaskStatus[]>;
  issueStatuses$!: Observable<IssueStatus[]>;
  issueTypes$!: Observable<IssueType[]>;
  priorities$!: Observable<Priority[]>;
  severities$!: Observable<Severity[]>;
  members$!: Observable<Membership[]>;
  epics$!: Observable<Epic[]>;
  stories$!: Observable<UserstoryList[]>;
  project$!: Observable<Project>;

  public querySearch() {
    this.searchApiService.search(1, 'Ability').subscribe(console.log);
  }

  initData() {
    this.projectId$.subscribe((projectResolver) => {
      this.project$ = this.projectsApiService.get(projectResolver.project);
      this.milestones$ = this.milestoneApiService.list(projectResolver.project);
      this.epicStatuses$ = this.epicStatusesApiService.list(projectResolver.project);
      this.userstoryStatuses$ = this.userstoryStatusesApiService.list(projectResolver.project);
      this.points$ = this.pointsApiService.list(projectResolver.project);
      this.taskStatuses$ = this.taskStatusesApiService.list(projectResolver.project);
      this.issueStatuses$ = this.issueStatusesApiService.list(projectResolver.project);
      this.issueTypes$ = this.issueTypesApiService.list(projectResolver.project);
      this.priorities$ = this.prioritiesApiService.list(projectResolver.project);
      this.severities$ = this.severitiesApiService.list(projectResolver.project);
      this.members$ = this.membershipsInvitationsApiService.list(projectResolver.project);
      this.epics$ = this.epicApiService.list({project: projectResolver.project});
      this.stories$ = this.userstoriesApiService.list({
        project: projectResolver.project,
      });
    });
  }

  public listUserStorage() {
    this.userStorageApiService.list().subscribe(console.log);
  }

  ngOnInit(): void {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      console.log(state);
    });

    this.exampleForm = this.fb.group({
      isChecked: new FormControl(false, Validators.required),
    });

    this.initData();
  }

  public listProjects() {
    this.projectsApiService.list({
      isBacklogActivated: true,
    }, ProjectsListOrderBy.totalActivityLastMonth).subscribe(console.log);
  }

}
