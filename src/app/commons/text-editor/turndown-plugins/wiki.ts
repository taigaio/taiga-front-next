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
