/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, Input, ChangeDetectionStrategy, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '@/app/api/projects/projects.model';
import { Permissions } from '@/app/api/roles/roles.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'tg-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openCollapse', [
      transition('open => collapsed', [
        query('[data-animation="text"]', style({ opacity: 1 })),
        query(':self', style({ width: '200px' })),

        query('[data-animation="text"]', animate(100, style({ opacity: 0 }))),
        query(':self', animate(300, style({ width: '48px' }))),
      ]),
      transition('collapsed => open', [
        query(':self', style({ width: '48px' })),

        query(':self', animate(300, style({ width: '200px' }))),
      ]),
    ]),
  ],
})
export class ProjectNavigationComponent implements OnChanges {
  @Input()
  public project: Project;
  public videoUrl: string;
  public scrumVisible = false;

  public collapseText = true;

  @HostBinding('class.collapsed')
  public collapsed = false;

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.project) {
      this.videoUrl = this.videoConferenceUrl();
    }
  }

  get isMenuEpicsEnabled() {
    return this.project.isEpicsActivated && this.project.myPermissions.includes(Permissions.viewEpics);
  }

  get isMenuScrumEnabled() {
    return this.project.isBacklogActivated && this.project.myPermissions.includes(Permissions.viewUserstory);
  }
  get isMenuKanbanEnabled() {
    return this.project.isKanbanActivated && this.project.myPermissions.includes(Permissions.viewUserstory);
  }
  get isMenuIssuesEnabled() {
    return this.project.isIssuesActivated && this.project.myPermissions.includes(Permissions.viewIssues);
  }

  get isMenuWikiEnabled() {
    return this.project.isWikiActivated && this.project.myPermissions.includes(Permissions.viewWikiPages);
  }

  public toggleScrum() {
    this.scrumVisible = !this.scrumVisible;
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  private videoConferenceUrl(): string {
    let baseUrl = '';

    if (this.project.videoconferences === 'whereby-com') {
      baseUrl = 'https://whereby.com/';
    } else if (this.project.videoconferences === 'talky') {
      baseUrl = 'https://talky.io/';
    } else if (this.project.videoconferences === 'jitsi') {
      baseUrl = 'https://meet.jit.si/';
    } else if (this.project.videoconferences === 'custom' && this.project.videoconferencesExtraData) {
      return this.project.videoconferencesExtraData;
    }

    let url = '';

    // Add prefix to the chat room name if exist
    if (this.project.videoconferencesExtraData) {
      url = `${this.project.slug}-${UtilsService.slugify(this.project.videoconferencesExtraData)}`;
    } else {
      url = this.project.slug;
    }

    // Some special cases
    if (this.project.videoconferences === 'jitsi') {
      url = url.replace(/-/g, '');
    }

    return baseUrl + url;
  }
}
