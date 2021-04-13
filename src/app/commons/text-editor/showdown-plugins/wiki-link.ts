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
