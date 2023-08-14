/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

export default (projectSlug: string) => {
  const rgxTicket = /(^|\s)(\\)?(#([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;
  const rgxMention = /(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;

  const referenceToProject = {
    type: 'lang',
    regex: rgxTicket,
    replace: (match: string, leadingSlash: string, _tag: string) => {
      if (leadingSlash === '\\') {
        return match;
      }

      const mentionPosition = match.indexOf('#');
      const start = match.slice(0, mentionPosition);
      const result = match
        .slice(mentionPosition)
        .replace('&nbsp;', '')
        .replace('#', '')
        .replace(/ /g, '');

      return `${start}[#${result}](project/${projectSlug}/t/${result})`;
    },
  };

  const referenceToUser = {
    type: 'lang',
    regex: rgxMention,
    replace: (match: string, leadingSlash: string, _tag: string) => {
      if (leadingSlash === '\\') {
        return match;
      }

      const mentionPosition = match.indexOf('@');
      const start = match.slice(0, mentionPosition);
      const result = match
        .slice(mentionPosition)
        .replace('&nbsp;', '')
        .replace('@', '')
        .replace(/ /g, '');

      return `${start}[@${result}](profile/${result})`;
    },
  };

  const linkReferences = {
    type: 'output',
    filter: (text: string) => {
      // this is for MentionCustomization upcast
      text = text.replace(
        new RegExp('href="project/', 'gi'),
        'class="mention" data-mention="true" href="project/'
      );
      text = text.replace(
        new RegExp('href="profile/', 'gi'),
        'class="mention" data-mention="true" href="profile/'
      );

      return text;
    },
  };

  return [referenceToProject, referenceToUser, linkReferences];
};
