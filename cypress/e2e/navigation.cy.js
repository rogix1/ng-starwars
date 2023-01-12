/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/', {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
    });
/*    cy.get('.navbar-nav').contains('Commands').click();
    cy.get('.dropdown-menu').contains('Navigation').click();*/
  });

  it("shows people", () => {
    cy.get('img').click();

    cy.get('#dataResults').should('be.visible');
    cy.get('#dataResults').find('div.link').should('have.length', 10);
  });

  it("can paginate", () => {
    cy.get('img').click();
    cy.get('#dataResults').should('be.visible');
    cy.get('#pageCounter').contains('1 of 9');

    cy.get('#nextPage').click();

    cy.get('#pageCounter').contains('2 of 9');
  });

  it("shows character details", () => {
    cy.get('img').click();
    cy.get('#dataResults > div').first().contains('Luke Skywalker');

    cy.get('#dataResults').first().click();

    const dd = cy.get('app-people > div').first().find('div');

    cy.get('app-people > div').first().find('div').first().contains('Name');
  });

  it("shows planet details", () => {
    cy.get('img').click();
    cy.get('#dataResults').first().click();
    cy.get('a.link').click();
    cy.get('app-planet').should('be.visible');
  });


});
