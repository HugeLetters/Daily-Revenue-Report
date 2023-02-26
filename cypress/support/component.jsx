// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { QueryClientProvider } from "@tanstack/react-query";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { queryClient } from "../../src/router/tanstack-query";
import store from "../../src/store/store";

Cypress.Commands.add("mount", element => {
  cy.intercept(
    "*",
    req => (req.url = req.url.replace(/(?<=localhost:)\d{1,4}/, Cypress.env("SERVER_PORT")))
  );
  return mount(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{element}</Provider>
    </QueryClientProvider>
  );
});

// Example use:
// cy.mount(<MyComponent />)
