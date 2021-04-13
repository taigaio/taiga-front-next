export default () => {
  const imageLink = {
    type: 'output',
    regex:   '<p>(<a.*?><img.*?<\/a>)<\/p>',
    replace: (_match: string, group: string) => {
      return group;
    },
  };

  return [imageLink];
};
