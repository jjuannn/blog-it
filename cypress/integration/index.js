/// <reference types="cypress" />

describe("Test application", () => {
    let fetchPolyFill

    before(() => {
        const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

        cy.request(polyfillUrl).then((res) => {
            fetchPolyFill = res.body
        })

        cy.visit("http://localhost:3000", {
            onBeforeLoad(contentWindow){
                delete contentWindow.fetch
                contentWindow.eval(fetchPolyFill)
                contentWindow.fetch = contentWindow.unfetch
            }
        })
    })

    beforeEach(() => {
        cy.intercept("http://localhost:8080/public/user_pictures?img=1", {
            fixture: "user_pic.png"
        })

        cy.get("#header").should("be.visible")

        cy.get(".page-footer").as("footer").should("be.visible")
        cy.get(".footer-list-item").as("footer-items").should("have.length", 4).should("be.visible")
    })

    it("test the landing page", () => {
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/")
        })

        cy.get(".list-item").should("have.length", 4)

        cy.get(".list-item").should("have.length", 4)

        cy.get(".title-text").should("have.text", "Share your thoughts with everyone...")
        cy.get(".subtitle-paragraph").should("have.text", "... wherever you want, whenever you want")
        cy.get(".img").should("be.visible")
        cy.get(".app-mobile-buttons").should("have.length", 3).should("be.visible")
        cy.get(".list-item").eq(1).click()
    })

    it("test the about page", () => {
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/about")
        })

        cy.get(".list-item").should("have.length", 4)

        cy.get(".about-section").should("be.visible")
        cy.get(".about-text").should("be.visible")
        cy.get(".about-text p").should("have.length", 4)
        cy.get(".about-text p").eq(0)
            .should("have.text", "Welcome to BlogIt! Your number one source for online messaging. We are dedicated to giving you the freedom to express yourself freely."
        )
        cy.get(".about-text p ").eq(1)
            .should("have.text", "Founded in 2015 by Juan M. Avero, BlogIt! It has come a long way since its inception in Rosario. When Juan began his passion for freedom, he wanted to start his own business, where we all have the same freedoms."
        )
        cy.get(".about-text p").eq(2)
            .should("have.text", " We hope you enjoy our service as much as we enjoy offering it to you. If you have any questions or comments, feel free to contact us."
        )
        cy.get(".about-text p").eq(3)
            .should("have.text", "Sincerely, BlogIt! team")

        cy.get(".list-item").eq(3).click()
    })

    it("test the register page", () => {
        cy.intercept("http://localhost:8080/users/register", {
            fixture: "successfully_auth.json"
        })

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/users/register")
        })
        const USER_DATA = {
            USERNAME: "testUser123",
            PASSWORD: "testPassword123",
            USER_PIC: "user_pic.png"
        }
        cy.get(".list-item").should("have.length", 4)

        cy.get(".userform-page").should("be.visible")
        cy.get(".title-text").should("have.text", "Register in BlogIt!")

        cy.get(".user-form").should("be.visible")
        cy.get(".user-form label").eq(0).should("have.text", "Username")
        cy.get(".user-form label").eq(1).should("have.text", "Password")

        cy.get(".form-input").eq(0)
            .should("have.attr", "name", "username")
            .should("have.attr", "type", "text")
            .should("have.value", "")
            .type(USER_DATA.USERNAME)
            .should("have.value", USER_DATA.USERNAME
        )

        cy.get(".form-input").eq(1)
            .should("have.attr", "name", "password")
            .should("have.attr", "type", "password")
            .should("have.value", "")
            .type(USER_DATA.PASSWORD)
            .should("have.value", USER_DATA.PASSWORD
        )

        cy.get(".form-input").eq(2)
            .should("have.attr", "name", "picture")
            .should("have.attr", "type", "file")
            .attachFile(USER_DATA.USER_PIC
        )

        cy.get(".form-buttons")
            .should("have.attr", "type", "submit")
        .click()
        
        cy.get(".list-item").should("have.length", 3)
        cy.get(".user-name")
            .should("be.visible")
            .should("have.length", 1)
            .should("have.text", USER_DATA.USERNAME
        )

        cy.get(".list-item").eq(2).click()
    })

    it("test publish new post without being logged in", () => {
        cy.intercept("http://localhost:8080/posts/all", {
            fixture: "posts.json"
        })
        cy.get(".list-item").eq(0).click()  
        cy.get(".new-post-button").click()

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/users/login")
        })
    })

    it("test login page", () => {
        cy.intercept("http://localhost:8080/users/login", {
            fixture: "successfully_auth.json"
        })

        cy.get(".list-item").should("have.length", 4)

        cy.get(".userform-page").should("be.visible")
        cy.get(".title-text").should("have.text", "LogIn in BlogIt!")

        cy.get(".user-form").should("be.visible")
        cy.get(".user-form label").eq(0).should("have.text", "Username")
        cy.get(".user-form label").eq(1).should("have.text", "Password")

        const USER_DATA = {
            USERNAME: "testUser123",
            PASSWORD: "testPassword123"
        }

        cy.get(".form-input").eq(0)
            .should("have.attr", "name", "username")
            .should("have.attr", "type", "text")
            .should("have.value", "")
            .type(USER_DATA.USERNAME)
            .should("have.value", USER_DATA.USERNAME
        )

        cy.get(".form-input").eq(1)
            .should("have.attr", "name", "password")
            .should("have.attr", "type", "password")
            .should("have.value", "")
            .type(USER_DATA.PASSWORD)
            .should("have.value", USER_DATA.PASSWORD
        )

        cy.get(".form-buttons")
            .should("have.attr", "type", "submit")
        .click()

        cy.get(".list-item").should("have.length", 3)
        cy.get(".user-name")
            .should("be.visible")
            .should("have.length", 1)
            .should("have.text", USER_DATA.USERNAME
        )

        cy.intercept("https://localhost:8080/posts/all", [])
        cy.get(".nav-text").eq(0).click()
    })

    it("test publish a post being logged in", () => {
        cy.intercept("http://localhost:8080/posts/all", {
            fixture: "posts.json"
        })
        
        cy.get(".timeline-title")
            .should("be.visible")
            .should("have.text", "Seems like nothing is happening here... Post something!"
        )

        cy.intercept("http://localhost:8080/posts/create", {
            fixture: "successfully_publish.json"
        })
        cy.get(".new-post-button").click()
        
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts/new")
        })

        cy.get(".create-page-title").should("have.text", "Create post...")
        cy.get(".post-form").should("be.visible")
    
        const POST_DATA = {
            TITLE: "Test2",
            TEXT: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin orci augue, ultrices sit amet massa lacinia, elementum viverra urna. Mauris a porta orci, id rhoncus velit.",
            PICTURE: "user_pic.png"
        }

        cy.get(".form-input").eq(0)
            .should("have.attr", "name", "title")
            .should("have.attr", "type", "text")
            .should("have.value", "")
            .type(POST_DATA.TITLE)
            .should("have.value", POST_DATA.TITLE
        )

        cy.get(".form-input").eq(1)
            .should("have.attr", "name", "text")
            .should("have.value", "")
            .should("have.class", "text-area")
            .type(POST_DATA.TEXT)
            .should("have.value", POST_DATA.TEXT
        )

        cy.get(".form-buttons").click()
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts")
        })
    })

    it("test that a post cannot be deleted if you are not the author", () => {
        cy.get(".post-container").should("be.visible")

        cy.get(".post-card").should("exist")
        cy.get(".post-card .post-header").should("exist")
        cy.get(".post-card .post-body").should("exist")
        cy.get(".post-header .delete-post").should("have.length", 1)
        // 1 because we only created 1 post, the other one is from another author

        cy.get(".list-item").eq(2).click()
    })
})