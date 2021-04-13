import { addDecorator, addParameters } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withA11y } from '@storybook/addon-a11y';

// import SvgSpritePlugin from '@psff/cmp-icon';
// Vue.use(SvgSpritePlugin, {
//   svgSpriteFile: require('../resources/sprite.svg')
// });

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
