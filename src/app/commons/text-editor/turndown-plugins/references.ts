import TurndownService from 'turndown';

export default (projectSlug: string) => {
  return (turndownService: TurndownService) => {
    turndownService.addRule('references', {
      filter: (node: HTMLElement) => {
        return node.tagName === 'A' &&
          !!(node.getAttribute('href')?.startsWith(`/project/${projectSlug}/t/`));
      },
      replacement: (_content, node: HTMLLinkElement) => {
        const username = node.getAttribute('href')?.split('/t/')[1];

        if (username) {
          return `#${username}`;
        }

        return '';
      },
    });
  };
};
