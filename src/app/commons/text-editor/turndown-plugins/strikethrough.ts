import TurndownService from 'turndown';

export default (turndownService: TurndownService) => {
  turndownService.addRule('strikethrough', {
    filter: ['del', 's'],
    replacement: (content) => {
      return '~~' + content + '~~';
    },
  });
};
