/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export default (projectSlug: string) => {
  const rgxTicket = /(^|\s)(\\)?(#([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;
  const rgxMention = /(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;

  const referenceToProject = {
    type:    'lang',
    regex: rgxTicket,
    replace: (match: string, leadingSlash: string, _tag: string) => {
        if (leadingSlash === '\\') {
          return match;
        }

        const mentionPosition = match.indexOf('#');
        const start = match.slice(0, mentionPosition);
        const result = match.slice(mentionPosition)
          .replace('&nbsp;', '')
          .replace('#', '')
          .replace(/ /g, '');

        return `${start}[#${result}](/project/${projectSlug}/t/${result})`;
    },
  };

  const referenceToUser = {
    type:    'lang',
    regex: rgxMention,
    replace: (match: string, leadingSlash: string, _tag: string) => {
        if (leadingSlash === '\\') {
          return match;
        }

        const mentionPosition = match.indexOf('@');
        const start = match.slice(0, mentionPosition);
        const result = match.slice(mentionPosition)
          .replace('&nbsp;', '')
          .replace('@', '')
          .replace(/ /g, '');

        return `${start}[@${result}](/profile/${result})`;
    },
  };

  const linkReferences = {
      type: 'output',
      filter: (text: string) => {
        // this is for MentionCustomization upcast
        text = text.replace(new RegExp('href="/project/', 'gi'), 'class="mention" data-mention="true" href="/project/');
        text = text.replace(new RegExp('href="/profile/', 'gi'), 'class="mention" data-mention="true" href="/profile/');

        return text;
      },
  };

  return [referenceToProject, referenceToUser, linkReferences];
};
