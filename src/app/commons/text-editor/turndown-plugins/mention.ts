/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import TurndownService from 'turndown';

export default (turndownService: TurndownService) => {
  turndownService.addRule('mention', {
    filter: (node: HTMLElement) => {
      return node.tagName === 'A' &&
        !!(node.getAttribute('href')?.startsWith('profile/'));
    },
    replacement: (_content, node: HTMLLinkElement) => {
      const username = node.getAttribute('href')?.split('profile/')[1];

      if (username) {
        return `@${username}`;
      }

      return '';
    },
  });
};
