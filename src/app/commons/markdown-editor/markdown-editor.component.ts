/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
