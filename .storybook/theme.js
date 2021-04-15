/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import {
  create
} from '@storybook/theming/create';

const colors = {
  neutral: {
    black: '#212121',
    white: '#fff',
  },
  grayscale: {
    700: '#5a5a5a',
    500: '#848484',
    200: '#adadad',
    100: '#d6d6d6',
    50: '#f7f7f7',
  },
  tool: {
    700: '#545601',
    500: '#5B8200',
    200: '#819701',
    100: '#E9EABF',
    50: '#FAFAEF',
  },
  primary: {
    700: '#1ab1c5',
    500: '#53c4d4',
    200: '#8cd8e2',
    100: '#c6ebf1',
    50: '#f4fcf9',
  },
  secondary: {
    700: '#3c1ac5',
    500: '#6d53d3',
    200: '#9e8ce2',
    100: '#cec6f1',
    50: '#f5f4fc',
  },
  green: {
    700: '#88ca4d',
    500: '#a5d779',
    100: '#e1f2d2',
  },
  yellow: {
    700: '#ffdb5a',
    500: '#ffe483',
    100: '#ffedac',
  },
  orange: {
    700: '#ff9f52',
    500: '#ffb77d',
    100: '#ffcfa8',
  },
  red: {
    700: '#ff5d4c',
    500: '#ff8579',
    100: '#ffaea5',
  },
}

export default create({
  base: 'light',

  colorPrimary: colors.tool['500'],
  colorSecondary: colors.secondary['500'],

  // UI
  appBg: colors.neutral.white,
  appContentBg: colors.primary['50'],
  appBorderColor: colors.grayscale['50'],
  appBorderRadius: 4,

  // Typography
  fontBase: '"Montserrat", "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.neutral.black,
  textInverseColor: colors.neutral.white,

  // Toolbar default and active colors
  barTextColor: colors.grayscale['200'],
  barSelectedColor: colors.tool['200'],
  barBg: colors.neutral.white,

  // Form colors
  inputBg: colors.neutral.white,
  inputBorder: colors.grayscale['50'],
  inputTextColor: colors.grayscale['400'],
  inputBorderRadius: 4,

  brandTitle: 'Taiga.io',
  brandUrl: '/',
  brandImage: ''
});
