/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tg-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent implements AfterViewInit {
  @ViewChild('textarea', {read: ElementRef}) private textarea: ElementRef;
  @HostBinding('class.empty') get empty() {
    return !!this.markdown.length;
  }

  private markdown = '';

  @Input()
  public set content(markdown: string) {
    this.setMarkdownContent(markdown);
  }

  @Output()
  public changed: EventEmitter<string> = new EventEmitter();

  @Output()
  public focusChanged: EventEmitter<boolean> = new EventEmitter();

  public getMarkdown() {
    return this.textarea.nativeElement.innerText;
  }

  public ngAfterViewInit() {
    this.setMarkdownContent(this.markdown);
  }

  public inputChange() {
    this.changed.emit(this.getMarkdown());
  }

  private setMarkdownContent(markdown: string) {
    this.markdown = markdown;

    if (this.textarea) {
      this.textarea.nativeElement.innerText = markdown;
    }
  }
}
