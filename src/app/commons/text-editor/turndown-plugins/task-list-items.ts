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
