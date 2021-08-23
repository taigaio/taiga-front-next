/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  OnChanges,
  SimpleChanges,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Project } from '@/app/api/projects/projects.model';
import { Permissions } from '@/app/api/roles/roles.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { LegacyService } from '@/app/commons/legacy/legacy.service';
import { pluck, map } from 'rxjs/operators';
import { Milestone } from '@/app/api/milestones/milestones.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '@/app/config.service';

interface ProjectMenuDialog {
  hover: boolean;
  open: boolean;
  slug: string;
  type: string;
  top: number;
  left: number;
  text: string;
  height: number;
  mainLinkHeight: number;
  isSearch: boolean;
  children: {
   text: string;
   link: string[];
  }[];
}

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
export class ProjectNavigationComponent implements OnChanges, OnInit {
  @Input()
  public project: Project;
  @Output()
  public search = new EventEmitter();

  public videoUrl: string | null;
  public scrumVisible = false;
  public collapseText = true;
  public section!: string;
  public dialog: ProjectMenuDialog = {
    open: false,
    hover: false,
    mainLinkHeight: 0,
    isSearch: false,
    type: '',
    slug: '',
    top: 0,
    left: 0,
    text: '',
    height: 0,
    children: [],
  };
  public milestoneId$: Observable<Milestone['id'] | undefined | null>;

  @HostBinding('class.collapsed')
  public collapsed = false;

  private dialogCloseTimeout?: number;

  @HostBinding('@openCollapse') get openCollapseAnimation() {
    return this.collapsed ? 'collapsed' : 'open';
  }

  @HostListener('@openCollapse.done') animationDone() {
    this.collapseText = this.collapsed ? true : false;
  }

  constructor(
    private readonly translateService: TranslateService,
    private readonly cd: ChangeDetectorRef,
    private readonly legacyService: LegacyService,
    private readonly router: Router,
    private readonly config: ConfigService) {}

  public ngOnInit() {
    this.collapsed = (localStorage.getItem('projectnav-collapsed') === 'true');
    this.section = this.getActiveSection();

    // LEGACY
    this.milestoneId$ = this.legacyService.legacyState
    .pipe(
      pluck('detailObj'),
      map((obj) => {
        return obj?.milestone;
      })
    );

    if (this.section === 'backlog') {
      this.scrumVisible = (localStorage.getItem('projectnav-scrum') === 'true');
    }
  }

  get baseHref() {
    return (this.config._config as any).baseHref ?? '/';
  }

  public getActiveSection() {
    const { breadcrumb, sectionName } = this.getSection();
    const indexBacklog = breadcrumb.lastIndexOf('backlog');
    const indexKanban = breadcrumb.lastIndexOf('kanban');

    let oldSectionName = '';

    if (indexBacklog !== -1 || indexKanban !== -1) {
        if (indexKanban === -1 || indexBacklog > indexKanban) {
            oldSectionName = 'backlog';
        } else {
            oldSectionName = 'kanban';
        }
    }

    // task & us the sectionName is backlog-kanban
    if  (sectionName  === 'backlog-kanban') {
        if (['backlog', 'kanban'].includes(oldSectionName)) {
          return oldSectionName;
        } else if (this.project.isBacklogActivated && !this.project.isKanbanActivated) {
          return 'backlog';
        } else if (!this.project.isBacklogActivated && this.project.isKanbanActivated) {
          return 'kanban';
        }
    }

    return sectionName;
  }

  public popup(event: MouseEvent, type: string) {
    if (!this.collapsed) {
      return;
    }

    this.initDialog(event.target as HTMLElement, type);
    this.dialog.type = type;
  }

  public popupScrum(event: MouseEvent) {
    if (!this.collapsed) {
      return;
    }

    const children: ProjectMenuDialog['children'] = this.milestones.map((milestone) => {
      return {
        text: milestone.name,
        link: [this.baseHref, 'project', this.project.slug, 'taskboard', milestone.slug],
      };
    });

    children.unshift({
      text: this.translateService.instant('PROJECT.SECTION.BACKLOG'),
      link: [this.baseHref, 'project', this.project.slug, 'backlog'],
    });

    this.initDialog(event.target as HTMLElement, 'scrum', children);
  }

  public get milestones() {
    return this.project.milestones
    .filter((milestone) => !milestone.closed)
    .reverse()
    .slice(0, 7);
  }

  public initDialog(el: HTMLElement, type: string, children: ProjectMenuDialog['children'] = []) {
    if (this.dialogCloseTimeout) {
      clearTimeout(this.dialogCloseTimeout);
    }
    const text = el.querySelector('.menu-option-text')?.innerHTML;

    if (text) {
      const link = el.querySelector('a')?.getAttribute('href');

      if (link) {
        this.dialog.slug = link;
      } else {
        this.dialog.slug = '';
      }

      const navigationBarWidth = 48;

      this.dialog.hover = false;
      this.dialog.mainLinkHeight = el.offsetHeight;
      this.dialog.left = navigationBarWidth;
      this.dialog.top = el.offsetTop;
      this.dialog.open = true;
      this.dialog.text = text;
      this.dialog.children = children;
      this.dialog.type = type;
    }
  }

  public out() {
    this.dialogCloseTimeout = setTimeout(() => {
      if (!this.dialog.hover) {
        this.dialog.open = false;
        this.dialog.type = '';
        this.cd.markForCheck();
      }
    }, 100);
  }

  public enterDialog() {
    this.dialog.open = true;
    this.dialog.hover = true;
  }

  public outDialog() {
    this.dialog.hover = false;
    this.out();
  }

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
    if (this.collapsed) {
      this.router.navigate(['/project', this.project.slug, 'backlog']);
    } else {
      this.scrumVisible = !this.scrumVisible;
      localStorage.setItem('projectnav-scrum', String(this.scrumVisible));
    }
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('projectnav-collapsed', String(this.collapsed));

    if (this.collapsed) {
      this.scrumVisible = false;
    }
  }

  private videoConferenceUrl(): string | null {
    let baseUrl = '';

    if (!this.project.videoconferences) {
      return null;
    }

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

  // LEGACY
  private getSection() {
    const injector = this.legacyService.getInjector();
    const projectService = injector.get('tgProjectService');

    return {
      breadcrumb: projectService.sectionsBreadcrumb.toJS(),
      sectionName: projectService.section,
    };
  }
}
