/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import showdown from 'showdown';
import TurndownService from 'turndown';
import * as turndownPluginGfm from 'turndown-plugin-gfm';

import taskListItems from './turndown-plugins/task-list-items';
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
      extensions: [referenceLink(projectSlug), wikiLink(projectSlug), imageLinks()],
    });

    this.turndownService = new TurndownService({
      codeBlockStyle: 'fenced',
    });

    this.turndownService.use([
      turndownPluginGfm.tables,
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
