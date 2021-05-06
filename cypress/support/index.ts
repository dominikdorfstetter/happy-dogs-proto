// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     *
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
  }
}
