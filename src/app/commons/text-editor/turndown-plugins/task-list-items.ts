/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import TurndownService from 'turndown';

export default (turndownService: TurndownService) => {
  turndownService.addRule('taskListItems', {
    filter: (node: HTMLInputElement) => {
      return node.type === 'checkbox';
    },
    replacement: (_content, node: HTMLInputElement) => {
      return (node.checked ? '[x]' : '[ ]') + ' ';
    },
  });
};
