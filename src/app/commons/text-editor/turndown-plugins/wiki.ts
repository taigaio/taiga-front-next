/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import TurndownService from 'turndown';

export default (projectSlug: string) => {
  return (turndownService: TurndownService) => {
    turndownService.addRule('references', {
      filter: (node: HTMLElement) => {
        return node.tagName === 'A' &&
          !!(node.getAttribute('href')?.startsWith(`/project/${projectSlug}/wiki/`));
      },
      replacement: (_content, node: HTMLLinkElement) => {
        let wikiLink = node.getAttribute('href');

        if (wikiLink) {
          const linkText = node.innerHTML;
          wikiLink = wikiLink.replace(`/project/${projectSlug}/wiki/`, '');

          if (wikiLink === linkText) {
            return `[[${wikiLink}]]`;
          } else {
            return `[[${wikiLink}|${linkText}]]`;
          }
        }

        throw new Error('Wiki link must have href');
      },
    });
  };
};
