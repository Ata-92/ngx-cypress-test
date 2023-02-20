/// <reference types="cypress" />

describe("Our first suite", () => {
  it("first case", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('input[placeholder="Email"]');
    cy.get('[placeholder="Email"][type="email"]');
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');
    cy.get("[data-cy='imputEmail1']");
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("[status='warning']", "Sign in");
    cy.get("#inputEmail3").parents("form").find("button");
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelText = firstForm.find('[for="inputEmail1"]').text();
      expect(emailLabelText).to.equal("Email");

      cy.wrap(firstForm).find('[for="inputEmail1"]').should("contain", "Email");
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).equal("Email address");
    });

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").find("[type='radio']").then(radioButtons => {
      cy.wrap(radioButtons).first().check({force: true}).should("be.checked")
    })

  })

  it("lists and dropdowns", () => {
    cy.visit("/");

    // cy.get("nav nb-select").click()
    // cy.get(".options-list").contains("Dark").click()
    // cy.get("nav nb-select").should("contain", "Dark")
    // cy.get("nb-layout-header nav").should("have.css", "background-color", "rgb(34, 43, 69)")

    cy.get("nav nb-select").then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should("contain", itemText)
        cy.get("nb-layout-header nav").should("have.css", "background-color", colors[itemText])
        index < 3 && cy.wrap(dropdown).click()

      })

    })


  })



  it.only("Web Tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody").contains("tr", "Larry").then(row => {
      cy.wrap(row).find(".nb-edit").click()
      cy.wrap(row).find("[placeholder='Age']").clear().type("25")
      cy.wrap(row).find(".nb-checkmark").click()
      cy.wrap(row).find("td").eq(6).should("contain", "25")
    })


  })



});
