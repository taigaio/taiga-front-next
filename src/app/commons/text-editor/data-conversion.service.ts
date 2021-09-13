/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import showdown from 'showdown';
import TurndownService from 'turndown';

import taskListItems from './turndown-plugins/task-list-items';
import tables from './turndown-plugins/tables';
import mention from './turndown-plugins/mention';
import references from './turndown-plugins/references';
import strikethrough from './turndown-plugins/strikethrough';
import wiki from './turndown-plugins/wiki';
import referenceLink from './showdown-plugins/reference-link';
import wikiLink from './showdown-plugins/wiki-link';
import imageLinks from './showdown-plugins/image-links';
import { Project } from '@/app/api/projects/projects.model';

@Injectable()
export class DataConversionService {
  public turndownService: TurndownService;
  public showdownConverter: showdown.Converter;

  public setUp(projectSlug: Project['slug']) {
    this.showdownConverter = new showdown.Converter({
      strikethrough: true,
      tables: true,
      tasklists: true,
      literalMidWordUnderscores: true,
      simpleLineBreaks: true,
      emoji: true,
      openLinksInNewWindow: true,
      backslashEscapesHTMLTags: true,
      extensions: [referenceLink(projectSlug), wikiLink(projectSlug), imageLinks()],
    });

    this.turndownService = new TurndownService({
      codeBlockStyle: 'fenced',
    });

    this.turndownService.use([
      tables,
      taskListItems,
      mention,
      references(projectSlug),
      wiki(projectSlug),
      strikethrough,
    ]);
  }

  public toHtml(markdown: string) {
    return this.showdownConverter.makeHtml(markdown);
  }

  public toMarkdown(html: string) {
    return this.turndownService.turndown(html);
  }

  public isReady() {
    return this.turndownService && this.showdownConverter;
  }
}
