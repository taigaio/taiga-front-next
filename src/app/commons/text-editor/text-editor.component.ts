/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, ViewChild, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { UploadAdapterService } from './upload-adapter.service';
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
    UploadAdapterService,
    DataConversionService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent implements OnInit {
  @ViewChild(HtmlEditorComponent) htmlEditor: HtmlEditorComponent;
  @ViewChild(MarkdownEditorComponent) markdownEditor: MarkdownEditorComponent;

  @Input()
  public projectSlug: Project['slug'];

  @Input()
  public projectId: Project['id'];

  // TODO: real ui lan
  public lan = 'en';

  @Input()
  public set members(members: Project['members']) {
    this.userMentions = members.map((member) => {
      return {
        id: `@${member.username}`,
        link: `/profile/${member.username}`,
        listRenderText: `@${member.username} - ${member.fullNameDisplay}`,
      };
    });
  }

  private userMentions: AutoCompleteItem[];

  public mode: 'html' | 'markdown' = 'html';
  public markdown = '';
  public html = '';

  constructor(
    public uploadAdapterService: UploadAdapterService,
    private readonly dataConversionService: DataConversionService,
    private readonly searchApiService: SearchApiService) {}

  public ngOnInit() {
    this.dataConversionService.setUp(this.projectSlug);
  }

  public toMarkdown() {
    this.mode = 'markdown';

    const html = this.htmlEditor.getHtml();
    this.markdown = this.dataConversionService.toMarkdown(html);
  }

  public toHtml() {
    this.mode = 'html';

    const markdown = this.markdownEditor.getMarkdown();
    this.html = this.dataConversionService.toHtml(markdown);
  }

  public feedUsers(search: string) {
    return Promise.resolve(this.userMentions.filter((member) => {
      return member.listRenderText.includes(search);
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
                link: `/project/${this.projectSlug}/t/${it.ref}`,
                text: `#${it.ref} - ${it.subject}`,
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
