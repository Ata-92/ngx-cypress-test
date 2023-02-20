import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe("Test with page objects", () => {
  beforeEach("open app", () => {
    cy.openHomePage()
  })

  it("verifying nav across the pages", () => {
    navigateTo.formLayoutPage()
  })

  it("should submit some forms and pick a date", () => {
    navigateTo.formLayoutPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail("Artem", "test@test.com")


  })



})
