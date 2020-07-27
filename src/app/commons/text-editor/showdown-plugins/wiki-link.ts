/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export default (projectSlug: string) => {
  const wikiLink = {
    type:    'lang',
    regex: /\[\[(.*?)\]\]/g,
    replace: (_match: string, wiki: string) => {
      const [link, title] = wiki.split('|');

      return `[${title || link}](/project/${projectSlug}/wiki/${link})`;
    },
  };

  return [wikiLink];
};
