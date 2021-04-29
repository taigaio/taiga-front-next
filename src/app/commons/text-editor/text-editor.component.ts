/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Component, ViewChild, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { DataConversionService } from './data-conversion.service';
import { HtmlEditorComponent } from '@/app/commons/html-editor/html-editor.component';
import { MarkdownEditorComponent } from '@/app/commons/markdown-editor/markdown-editor.component';
import { Project } from '@/app/api/projects/projects.model';
import { SearchApiService } from '@/app/api/search/search-api.service';
import { map } from 'rxjs/operators';
import { AutoCompleteItem } from './text-editor.model';

@Component({
  selector: 'tg-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  providers: [
    DataConversionService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {
  @ViewChild(HtmlEditorComponent) htmlEditor: HtmlEditorComponent;
  @ViewChild(MarkdownEditorComponent) markdownEditor: MarkdownEditorComponent;

  @Input()
  public projectSlug: Project['slug'];

  @Input()
  public projectId: Project['id'];

  @Input()
  public placeholder: string;

  @Input()
  public lan = 'en';

  // Legacy, use modern service instead of anguar.js
  @Input()
  public uploadFunction: (value?: unknown) => void;

  @Input()
  public set markdown(content: string) {
    // LEGACY, can be done in contructor
    if (!this.dataConversionService.isReady()) {
      this.dataConversionService.setUp(this.projectSlug);
    }

    this.contentMarkdown = content;
    this.contentHtml = this.dataConversionService.toHtml(content);

    if (this.htmlEditor) {
      // force run content set in HtmlEditorComponent when the new input is the same as the old one
      // refactor needed
      this.htmlEditor.content = this.contentHtml;
    }

    // LEGACY, needed in webcomponent
    this.cd.detectChanges();
  }

  @Input()
  public set members(members: Project['members']) {
    this.userMentions = members.map((member) => {
      return {
        id: `@${member.username}`,
        link: `profile/${member.username}`,
        listRenderText: `@${member.username} - ${member.fullNameDisplay}`,
      };
    });
  }

  @Input()
  public set mode(mode: 'html' | 'markdown') {
    if (this._mode !== mode) {
      this._mode = mode;
      // LEGACY, needed in webcomponent
      this.cd.detectChanges();
    }
  }

  public get mode() {
    return this._mode;
  }

  @Output()
  public focusChanged: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public changed: EventEmitter<string> = new EventEmitter();

  @Output()
  public modeChanged: EventEmitter<'html' | 'markdown'> = new EventEmitter();

  private userMentions: AutoCompleteItem[];
  private _mode: 'html' | 'markdown' = 'html';

  public contentHtml = '';
  public contentMarkdown = '';

  constructor(
    private readonly dataConversionService: DataConversionService,
    private readonly searchApiService: SearchApiService,
    private readonly cd: ChangeDetectorRef) {}

  public toMarkdown() {
    this._mode = 'markdown';

    const html = this.htmlEditor.getHtml();
    this.contentMarkdown = this.dataConversionService.toMarkdown(html);

    this.modeChanged.emit(this._mode);
  }

  public toHtml() {
    this._mode = 'html';

    const markdown = this.markdownEditor.getMarkdown();
    this.contentHtml = this.dataConversionService.toHtml(markdown);

    this.modeChanged.emit(this._mode);
  }

  public feedUsers(search: string) {
    return Promise.resolve(this.userMentions.filter((member) => {
      return member.listRenderText.toLowerCase().includes(search.toLowerCase());
    }));
  }

  public feedReferences(search: string) {
    return new Promise((resolve) => {
      this.searchApiService
      .search(this.projectId, search)
      .pipe(
        map((results) => {
          if (!results.count || results.count === results.wikipages.length) {
            return [];
          }

          const formatResult = (result: {ref: number, subject: string}[]) => {
            return result.map((it) => {
              return {
                id: `#${it.ref}`,
                link: `project/${this.projectSlug}/t/${it.ref}`,
                // text: `#${it.ref} - ${it.subject}`,
                listRenderText: `#${it.ref} - ${it.subject}`,
              };
            });
          };

          return [
            ...formatResult(results.userstories),
            ...formatResult(results.issues),
            ...formatResult(results.tasks),
          ].slice(0, 10);
        })
      )
      .subscribe((result) => {
        resolve(result);
      });
    });
  }
}
