// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillFieldset", { prevSubject: "element" }, (fieldset, limit) => {
  cy.wrap(fieldset)
    .find("input")
    .each((el, i) => cy.wrap(el).checkInput(i < limit, i));
});

Cypress.Commands.add("checkFieldsetAll", (limit = Infinity, fieldsetCount) => {
  if (fieldsetCount) {
    cy.get("fieldset:not(:has(legend))").should("have.length", 0);
    cy.get("fieldset:has(legend)").should("have.length", fieldsetCount);
    cy.get("fieldset:has(legend)").each(el => cy.wrap(el).fillFieldset(limit));
  } else {
    cy.get("form")
      .find("input")
      .each((el, i) => cy.wrap(el).checkInput(i < limit, i));
  }
});

Cypress.Commands.add("checkForm", () =>
  cy.get("form#currentForm").then(el => {
    const keySet = new Set();
    for (let key of new FormData(el[0]).keys()) {
      keySet.add(key);
    }
    cy.get("input[name]").should("have.length", keySet.size);
  })
);

Cypress.Commands.add(
  "checkInput",
  { prevSubject: "element" },
  (el, shouldType = true, text = "1") => {
    expect(el).to.be.visible;
    if (!shouldType) return;
    cy.wrap(el)
      .invoke("attr", "type")
      .then(x => {
        if (x == "date") {
          cy.wrap(el).type("2022-05-13");
        } else {
          cy.wrap(el).type(text);
        }
      });
  }
);
