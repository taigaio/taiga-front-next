/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import TurndownService from 'turndown';

export default (turndownService: TurndownService) => {
  turndownService.addRule('taskListItems', {
    filter: (node: HTMLInputElement) => {
      return node.type === 'checkbox' &&
        !!(node.closest('label')) &&
        !!(node.closest('li')) ;
    },
    replacement: (_content, node: HTMLInputElement) => {
      return (node.checked ? '[x]' : '[ ]') + ' ';
    },
  });
};
