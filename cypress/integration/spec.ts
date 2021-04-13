describe('Playground', () => {

  it('loads examples', () => {
    const baseUrl = 'http://localhost:4200';
    cy.visit(baseUrl);
    cy.contains('Taiga');
  });
});
