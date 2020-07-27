/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, ElementRef, ViewChild, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import InlineEditor from 'taiga-html-editor/packages/ckeditor5-build-balloon/build/ckeditor';
import emojis from './emoji.json';
import { UploadFileAdapter } from '@/app/commons/text-editor/upload-file-adapter.model';

// When changing this, remember to also change in the ckeditor repo
const DEFAULT_CKEDITOR_LAN = 'en';

@Component({
  selector: 'tg-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlEditorComponent implements AfterViewInit {
  @Input() feedUsers: (text: string) => Promise<{id: string; link: string}[]>;
  @Input() feedReferences: (text: string) => Promise<{id: string; link: string}[]>;
  @Input() uploadFileService: UploadFileAdapter;
  @Input() lan = DEFAULT_CKEDITOR_LAN;

  @Input()
  public set content(markdown: string) {
    this.setHtmlContent(markdown);
  }

  @ViewChild('el', {read: ElementRef}) private el: ElementRef;

  private html = '';

  private editor: any;

  public ngAfterViewInit() {
    if (this.lan !== DEFAULT_CKEDITOR_LAN) {
      import(`taiga-html-editor/packages/ckeditor5-build-balloon/build/translations/${this.lan}.js`)
      .then(() => {
        this.initEditor();
      })
      .catch(() => {
        console.error(`Error trying to load ${this.lan}`);
        this.lan = DEFAULT_CKEDITOR_LAN;
        this.initEditor();
      });
    } else {
      this.initEditor();
    }
  }

  private initEditor() {
    const uploadFileService = this.uploadFileService;

    function uploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        uploadFileService.setLoader(loader);

        return uploadFileService;
      };
    }

    InlineEditor
    .create(this.el.nativeElement, {
      language: this.lan,
      extraPlugins: [
        uploadAdapterPlugin.bind(this),
      ],
      mention: {
        feeds: [
          {
            marker: '@',
            feed: this.feedUsers,
            itemRenderer: this.customItemRenderer.bind(this),
          },
          {
            marker: '#',
            feed: this.feedReferences,
            minimumCharacters: 1,
            itemRenderer: this.customItemRenderer.bind(this),
          },
          {
            marker: ':',
            feed: this.getEmojis,
            itemRenderer: this.emojisRenderer,
          },
        ],
      },
    })
    .then((editor: any) => {
      this.editor = editor;
      this.editor.setData(this.html);

      // Hide switch tranform to table header row because it doesn't have markdown equivalent
      this.hideTableHederRowSwitch();
    })
    .catch((error: any) => {
      console.error(error);
    });
  }

  private customItemRenderer(item: any) {
    const itemElement = document.createElement( 'span' );

    itemElement.classList.add('custom-item');
    itemElement.id = `mention-list-item-id-${item.id}`;
    itemElement.textContent = `${item.listRenderText ? item.listRenderText : item.id}`;

    return itemElement;
  }

  private hideTableHederRowSwitch() {
    const widgetToolbarRepository = this.editor.plugins.get('WidgetToolbarRepository');

    this.editor.plugins.get('ContextualBalloon')
    .on('change:visibleView', (_eventInfo: any, _name: string, value: any) => {
      const isTableToolbarVisible = widgetToolbarRepository
        ._isToolbarVisible(widgetToolbarRepository._toolbarDefinitions.get('tableContent'));

      if (isTableToolbarVisible && value) {
        const model = this.editor.model;
        const table = model.document.selection.focus.getAncestors().find((it: any) => it.name === 'table');

        // set the first row as a header beacuse markdown only support tables with header
        if (!table.getAttribute('headingRows')) {
          this.editor.execute('setTableRowHeader');
        }

        const dropdowns = Array.from(document.querySelectorAll('.ck-dropdown .ck-list')) as HTMLElement[];

        dropdowns.forEach((dropdown) => {
          const dropdownItems = dropdown.querySelectorAll('li');

          if (dropdownItems.length) {
            dropdownItems[0].style.display = 'none';
            dropdownItems[1].style.display = 'none';
          }
        });
      }
    });
  }

  private emojisRenderer(emoji: {id: string; text: string}) {
    const itemElement = document.createElement('span');

    itemElement.textContent = `${emoji.text} ${emoji.id}`;

    return itemElement;
  }

  private getEmojis(search: string) {
    return new Promise((resolve) => {
      const emojisFiltred = Object.entries(emojis)
        .filter(([keyword]) => keyword.includes(search))
        .map(([keyword, character]) => {
          return {id: `:${keyword}:`, text: character};
        })
        .slice(0, 10);

      resolve(emojisFiltred);
    });
  }

  public getHtml() {
    return this.editor.getData();
  }

  public setHtmlContent(html: string) {
    this.html = html;

    if (this.editor) {
      this.editor.setData(this.html);
    }
  }
}
