import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import { ProjectStatus } from "@api/projects.types";

// Mapping for status display text
const statusText: { [key in ProjectStatus]: string } = {
  [ProjectStatus.info]: "Stable",
  [ProjectStatus.warning]: "Warning",
  [ProjectStatus.error]: "Critical",
};

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          // cy.wrap($el).contains(mockProjects[index].name);
          // cy.wrap($el).contains(languageNames[index]);
          // cy.wrap($el).contains(mockProjects[index].numIssues);
          // cy.wrap($el).contains(mockProjects[index].numEvents24h);
          // cy.wrap($el).contains(capitalize(mockProjects[index].status));

          const project = mockProjects[index];

          // check that project data is rendered
          cy.wrap($el).contains(project.name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(project.numIssues);
          cy.wrap($el).contains(project.numEvents24h);

          // Check for the correct status text
          const expectedStatusText =
            statusText[project.status as ProjectStatus];
          cy.wrap($el).contains(capitalize(expectedStatusText));

          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
