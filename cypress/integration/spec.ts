/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

describe('Playground', () => {

  it('loads examples', () => {
    const baseUrl = 'http://localhost:4200';
    cy.visit(baseUrl);
    cy.contains('Taiga');
  });
});
