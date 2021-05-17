describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display website name', () => {
    cy.get('h1').contains('phurma');
  });

  it('should display index showcase title', () => {
    cy.get('h2').contains('Integrate Forms with an API');
  });

  it('link should redirect to auth api', () => {
    cy.get('a').should('have.attr', 'href', '/api/auth/login?returnTo=/dashboard');
  });
});
