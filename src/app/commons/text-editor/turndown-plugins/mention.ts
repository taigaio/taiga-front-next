/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
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
