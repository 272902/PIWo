describe("Check page", () => {
    it("Check main page nav has 4 keys", () => {
        cy.visit("http://localhost:5173/");
        cy.get("nav").should("exist");
        cy.get("nav a").should("have.length", 3);
    });

    it("Check if finds Lalka", () => {
        cy.visit("http://localhost:5173/");
        cy.wait(300);
        cy.get("input").type("Lalka");
        cy.get("article").should("have.length", 1);
    });

    it("Check filters", () => {
        cy.visit("http://localhost:5173/");
        cy.wait(300);
        cy.get("select").select("Poemat");
        cy.get("article").should("have.length", 1);
    });
})