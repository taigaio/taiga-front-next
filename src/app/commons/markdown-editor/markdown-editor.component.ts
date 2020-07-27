/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tg-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent implements AfterViewInit {
  @ViewChild('textarea', {read: ElementRef}) private textarea: ElementRef;

  private markdown = '';

  @Input()
  public set content(markdown: string) {
    this.setMarkdownContent(markdown);
  }

  public getMarkdown() {
    return this.textarea.nativeElement.value;
  }

  public ngAfterViewInit() {
    this.setMarkdownContent(this.markdown);
  }

  private setMarkdownContent(markdown: string) {
    this.markdown = markdown;

    if (this.textarea) {
      this.textarea.nativeElement.value = markdown;
    }
  }
}
