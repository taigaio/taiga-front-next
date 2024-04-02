/*
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
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
    // Using quotes
    'font-family-name-quotes': 'always-unless-keyword',
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'string-quotes': 'double',
    // Disallow vendor prefixes
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    // Specificity
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 3,
    'selector-max-specificity': "1,2,1",
    // Miscellanea
    'color-named': 'never',
    'color-no-hex': true,
    'declaration-no-important': true,
    'declaration-property-unit-whitelist': {
      "font-size": ["rem"],
      "/^animation/": ["s"]
    },
    'number-leading-zero': 'never',
    'order/properties-alphabetical-order': true,
    'selector-max-type': 1,

    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    // Notation
    'font-weight-notation': 'numeric',
    // URLs
    'function-url-no-scheme-relative': true,
    // Max line length
    'max-line-length': [
      120,
      {
        ignore: ['comments'],
      }
    ],
  },
};
