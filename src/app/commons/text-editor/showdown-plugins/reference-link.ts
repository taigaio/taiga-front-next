/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export default (projectSlug: string) => {
  const rgx = /(^|\s)(\\)?(#([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;

  const referenceToProject = {
    type:    'lang',
    regex: rgx,
    replace: (match: string, leadingSlash: string, _tag: string) => {
        if (leadingSlash === '\\') {
          return match;
        }

        match = match
          .replace('&nbsp;', '')
          .replace('#', '')
          .trim();

        return `[#${match}](/project/${projectSlug}/t/${match})`;
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

  return [referenceToProject, linkReferences];
};
