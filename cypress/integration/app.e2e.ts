/**
 * APP E2E
 */
it('works', () => {
  cy.visit('/');
  // IntelliSense and TS compiler should
  // not complain about unknown method
  cy.dataCy('headline');
});
