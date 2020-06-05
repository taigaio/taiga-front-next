/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, addParameters } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withA11y } from '@storybook/addon-a11y';

// import SvgSpritePlugin from '@psff/cmp-icon';
// Vue.use(SvgSpritePlugin, {
//   svgSpriteFile: require('../resources/sprite.svg')
// });

// import '../styles/App.css';

// const req = require.context('../stories', true, /.stories.[tj]sx?$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// Centerd items
addDecorator(centered);

// Accesibility addon
addDecorator(withA11y);

// Background
addParameters({
  backgrounds: [{
    name: 'App',
    value: '#fff',
    default: true
  }, ],
});

// configure(loadStories, module);