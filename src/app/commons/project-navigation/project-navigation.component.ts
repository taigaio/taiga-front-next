/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

<<<<<<< HEAD
import { Component, Input, ChangeDetectionStrategy, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
=======
import { Component, Input, ChangeDetectionStrategy, HostBinding, OnChanges, SimpleChanges, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
>>>>>>> 528fb81... feat(project-nav): improvements
import { Project } from '@/app/api/projects/projects.model';
import { Permissions } from '@/app/api/roles/roles.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

interface MenuOption {
  name: string;
  type: 'link' | 'button';
  svg: string;
  link?: string[];
  targetBlank?: boolean;
  action?: () => void;
  children?: {
    link: string[];
    text: string;
  }[];
}

interface Menu {
  top: MenuOption[];
  bottom: MenuOption[];
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
  public menu: Menu;
  public collapseText = true;
  public dialog: {
    open: boolean;
    slug: string;
    top: number;
    left: number;
    text: string;
    height: number;
    extraLinks: {
     text: string;
     link: string;
    }[]
  } = {
    open: false,
    slug: '',
    top: 0,
    left: 0,
    text: '',
    height: 0,
    extraLinks: [],
  };

  @HostBinding('class.collapsed')
  public collapsed = false;

  @HostBinding('@openCollapse') get openCollapseAnimation() {
    return this.collapsed ? 'collapsed' : 'open';
  }

  @HostListener('@openCollapse.done') animationDone() {
    this.collapseText = this.collapsed ? true : false;
  }

  constructor(private translateService: TranslateService) {}

  public popup(event: MouseEvent) {
    console.log(event);
    return;

    // if (!this.collapsed) {
    //   return;
    // }

    // const el = event.target as HTMLElement;
    // const text = el.querySelector('.menu-option-text')?.innerHTML;
    // const link = el.querySelector('a')?.getAttribute('href');

    // if (text && link) {
    //   const elBounding = el.getBoundingClientRect();

    //   const navigationBarWidth = 48;
    //   this.dialog.slug = link;
    //   this.dialog.left = elBounding.left + navigationBarWidth;
    //   this.dialog.top = elBounding.top;
    //   this.dialog.height = elBounding.height;
    //   this.dialog.open = true;
    //   this.dialog.text = text;
    // }
  }

  popupScrum() {

  }

  popupAction() {

  }

  public out() {
    this.dialog.open = false;
  }

  public ngOnInit() {
    this.collapsed = (localStorage.getItem('projectnav-collapsed') === 'true');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.project) {
      this.videoUrl = this.videoConferenceUrl();
      this.getProjectMenu();
    }
  }

  public getProjectMenu(): Menu {
    const menu: Menu = {
      top: [],
      bottom: [],
    };

    if (this.isMenuEpicsEnabled) {
      menu.top.push({
        name: this.translateService.instant('PROJECT.SECTION.EPICS'),
        type: 'link',
        svg: 'epic',
        link: ['/project', this.project.slug, 'epics'],
      });
    }

    if (this.isMenuScrumEnabled) {
      menu.top.push({
        name: this.translateService.instant('PROJECT.SECTION.SCRUM'),
        type: 'link',
        svg: 'epic',
        link: ['/project', this.project.slug, 'epics'],
      });
    }

    if (this.isMenuEpicsEnabled) {
      menu.top.push({
        name: this.translateService.instant('PROJECT.SECTION.EPICS'),
        type: 'link',
        svg: 'epic',
        link: ['/project', this.project.slug, 'epics'],
      });
    }

    if (this.isMenuEpicsEnabled) {
      menu.top.push({
        name: this.translateService.instant('PROJECT.SECTION.EPICS'),
        type: 'link',
        svg: 'epic',
        link: ['/project', this.project.slug, 'epics'],
      });
    }


    return menu;
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
