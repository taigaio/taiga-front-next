/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import ClassicEditor from 'taiga-html-editor/packages/ckeditor5-build-classic/build/ckeditor';
import emojis from './emoji.json';
import languages from './languages.json';
import { UploadAdapterService } from '@/app/commons/text-editor/upload-adapter.service';

// When changing this, remember to also change in the ckeditor repo
const DEFAULT_CKEDITOR_LAN = 'en';

@Component({
  selector: 'tg-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlEditorComponent implements AfterViewInit {
  @Input() feedUsers: (text: string) => Promise<{ id: string; link: string }[]>;
  @Input() feedReferences: (
    text: string
  ) => Promise<{ id: string; link: string }[]>;
  @Input() lan = DEFAULT_CKEDITOR_LAN;
  @Input() placeholder = '';

  // Legacy, use modern service instead of anguar.js
  @Input()
  public uploadFunction: (value?: unknown) => void;

  @Input()
  public set content(html: string) {
    this.setHtmlContent(html);
  }
  @Output()
  public focusChanged: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public changed: EventEmitter<string> = new EventEmitter();

  @ViewChild('el', { read: ElementRef }) private el: ElementRef;

  private html = '';

  private editor: any;

  private getTextPartLanguages(): { title: string; languageCode: string }[] {
    const langList: { title: string; languageCode: string }[] = [
      { title: 'العربية', languageCode: 'ar' },
      { title: 'Deutsch', languageCode: 'de' },
      { title: 'English', languageCode: 'en' },
      { title: 'Español', languageCode: 'es' },
      { title: 'Français', languageCode: 'fr' },
      { title: '日本語', languageCode: 'ja' },
      { title: '한국어', languageCode: 'ko' },
      { title: 'Português', languageCode: 'pt' },
      { title: 'русский', languageCode: 'ru' },
      { title: '中文', languageCode: 'zh' },
    ];
    return langList.filter((lang) => {
      return lang.languageCode !== this.lan;
    });
  }

  // LEGACY
  public getLegacyLoadTranslation() {
    return new Promise((resolve) => {
      (window as any).ljs.load(
        `/${(window as any).TAIGA_VERSION}/ckeditor-translations/${
          this.lan
        }.js`,
        resolve
      );
    });
  }

  public ngAfterViewInit() {
    if (this.lan !== DEFAULT_CKEDITOR_LAN) {
      // import(`taiga-html-editor/packages/ckeditor5-build-classic/build/translations/${this.lan}.js`)
      // LEGACY
      this.getLegacyLoadTranslation()
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
    const uploadFunction = this.uploadFunction;

    function uploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (
        loader: any
      ) => {
        return new UploadAdapterService(loader, uploadFunction);
      };
    }

    ClassicEditor.create(this.el.nativeElement, {
      placeholder: this.placeholder,
      language: {
        content: this.lan,
        textPartLanguage: this.getTextPartLanguages(),
      },
      codeBlock: {
        languages: [...languages],
      },
      extraPlugins: [uploadAdapterPlugin.bind(this)],
      link: {
        decorators: {
          newPage: {
            mode: 'automatic',
            callback: () => true,
            attributes: {
              target: '_blank',
            },
          },
        },
      },
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
      typing: {
        transformations: {
          include: ['symbols', 'mathematical', 'quotes'],
        },
      },
    })
      .then((editor: any) => {
        this.editor = editor;
        this.editor.setData(this.html);
        editor.ui.focusTracker.on(
          'change:isFocused',
          (_event: any, _name: any, value: boolean) => {
            this.focusChanged.emit(value);
          }
        );

        editor.model.document.on('change:data', () => {
          this.html = this.getHtml();
          this.changed.emit(this.html);
        });

        // Hide switch tranform to table header row because it doesn't have markdown equivalent
        this.hideTableHederRowSwitch();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  private customItemRenderer(item: any) {
    const itemElement = document.createElement('span');

    itemElement.classList.add('custom-item');
    itemElement.id = `mention-list-item-id-${item.id}`;
    itemElement.textContent = `${
      item.listRenderText ? item.listRenderText : item.id
    }`;

    return itemElement;
  }

  private hideTableHederRowSwitch() {
    const widgetToolbarRepository = this.editor.plugins.get(
      'WidgetToolbarRepository'
    );

    this.editor.plugins
      .get('ContextualBalloon')
      .on(
        'change:visibleView',
        (_eventInfo: any, _name: string, value: any) => {
          const isTableToolbarVisible =
            widgetToolbarRepository._isToolbarVisible(
              widgetToolbarRepository._toolbarDefinitions.get('tableContent')
            );

          if (isTableToolbarVisible && value) {
            const model = this.editor.model;
            const table = model.document.selection.focus
              .getAncestors()
              .find((it: any) => it.name === 'table');

            // set the first row as a header beacuse markdown only support tables with header
            if (!table.getAttribute('headingRows')) {
              this.editor.execute('setTableRowHeader');
            }

            const dropdowns = Array.from(
              document.querySelectorAll('.ck-dropdown .ck-list')
            ) as HTMLElement[];

            dropdowns.forEach((dropdown) => {
              const dropdownItems = dropdown.querySelectorAll('li');

              if (dropdownItems.length) {
                dropdownItems[0].style.display = 'none';
                dropdownItems[1].style.display = 'none';
              }
            });
          }
        }
      );
  }

  private emojisRenderer(emoji: { id: string; text: string }) {
    const itemElement = document.createElement('span');

    itemElement.textContent = `${emoji.text} ${emoji.id}`;

    return itemElement;
  }

  private getEmojis(search: string) {
    return new Promise((resolve) => {
      const emojisFiltred = Object.entries(emojis)
        .filter(([keyword]) => keyword.includes(search))
        .map(([keyword, character]) => {
          return { id: `:${keyword}:`, text: character };
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
