/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

module.exports = {
  root: true,
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],
    'color-named': 'never',
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'function-url-quotes': 'always',
    'max-nesting-depth': 3,
    'number-leading-zero': 'never',
    'order/properties-alphabetical-order': true,
    'selector-attribute-quotes': 'always',
    'selector-max-compound-selectors': 3,
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    'string-quotes': 'double',
  },
};