/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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

  public videoUrl: string;
  public scrumVisible = false;
  public collapseText = true;
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

  @HostBinding('class.collapsed')
  public collapsed = false;

  private dialogCloseTimeout?: number;

  @HostBinding('@openCollapse') get openCollapseAnimation() {
    return this.collapsed ? 'collapsed' : 'open';
  }

  @HostListener('@openCollapse.done') animationDone() {
    this.collapseText = this.collapsed ? true : false;
  }

  constructor(private translateService: TranslateService, private cd: ChangeDetectorRef) {}

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
        link: ['/project', this.project.slug, 'taskboard', milestone.slug],
      };
    });

    children.unshift({
      text: this.translateService.instant('PROJECT.SECTION.BACKLOG'),
      link: ['/project', this.project.slug, 'backlog'],
    });

    this.initDialog(event.target as HTMLElement, 'scrum', children);
  }

  public get milestones() {
    return this.project.milestones
      .slice(0, 7)
      .filter((milestone) => !milestone.closed)
      .reverse();
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

  public ngOnInit() {
    this.collapsed = (localStorage.getItem('projectnav-collapsed') === 'true');
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
    if (!this.collapsed) {
      this.scrumVisible = !this.scrumVisible;
    }
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('projectnav-collapsed', String(this.collapsed));

    if (this.collapsed) {
      this.scrumVisible = false;
    }
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
