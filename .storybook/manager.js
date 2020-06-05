import { addons } from '@storybook/addons';
import Taiga from './theme';

import '@storybook/addon-knobs/register';
import '@storybook/addon-links/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-notes/register';

addons.setConfig({
  theme: Taiga,
});
