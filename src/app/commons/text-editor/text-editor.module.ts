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
