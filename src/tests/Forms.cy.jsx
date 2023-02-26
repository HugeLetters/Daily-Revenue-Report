import DailyFoodservice from "../pages/day/Foodservice";
import DailyRooms from "../pages/day/Rooms";
import Postings from "../pages/day/Postings";
import FinancialRooms from "../pages/financial/Rooms";
import FinancialFoodservice from "../pages/financial/Foodservice";
import RollingForecast from "../pages/financial/RollingForecast";

function checkFormDataCollision(element, fieldsetCount) {
  cy.mount(element);
  cy.checkFieldsetAll(Cypress.env("FIELDSET_INPUT_LIMIT"), fieldsetCount);
  cy.checkForm();
}

describe("No FormData key collision", () => {
  describe("Daily", () => {
    it("Rooms", () => {
      checkFormDataCollision(<DailyRooms />, 5);
    });
    it("F&B", () => {
      checkFormDataCollision(<DailyFoodservice />, 3);
    });
    it("Postings", () => {
      checkFormDataCollision(<Postings />, 0);
    });
  });

  describe("Financial", () => {
    it("Rooms", () => {
      checkFormDataCollision(<FinancialRooms />, 3);
    });
    it("F&B", () => {
      checkFormDataCollision(<FinancialFoodservice />, 2);
    });
    it("Postings", () => {
      checkFormDataCollision(<RollingForecast />, 2);
    });
  });
});
