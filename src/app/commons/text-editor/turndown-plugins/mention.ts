import TurndownService from 'turndown';

export default (turndownService: TurndownService) => {
  turndownService.addRule('mention', {
    filter: (node: HTMLElement) => {
      return node.tagName === 'A' &&
        !!(node.getAttribute('href')?.startsWith('/profile/'));
    },
    replacement: (_content, node: HTMLLinkElement) => {
      const username = node.getAttribute('href')?.split('/profile/')[1];

      if (username) {
        return `@${username}`;
      }

      return '';
    },
  });
};
