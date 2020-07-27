/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { MarkdownEditorModule } from '@/app/commons/markdown-editor/markdown-editor.module';
import { HtmlEditorModule } from '../html-editor/html-editor.module';
import { SearchApiModule } from '@/app/api/search/search-api.module';

@NgModule({
  providers: [],
  declarations: [TextEditorComponent],
  exports: [TextEditorComponent],
  imports: [
    CommonModule,
    MarkdownEditorModule,
    HtmlEditorModule,
    SearchApiModule,
  ],
})
export class TextEditorModule { }
