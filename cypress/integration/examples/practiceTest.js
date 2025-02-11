//Mocha framework decribe and it 

const {generateUsername} = require('unique-username-generator')

const generator = require('generate-password')

let userName = generateUsername()

let password = generator.generate({
    length: 5,
    numbers: true,
    uppercase: true,
})



describe("this is my first practice test",function(){
    it("this is my first visit", function(){
        cy.visit("https://www.demoblaze.com/")
        cy.get("#login2").should("be.visible").click()
        cy.wait(2000)//this to pause cypress action so it is visible
        cy.get("input[id='loginusername']").type("test")
        cy.wait(2000)
        cy.get("input[id='loginpassword']").type("test")
        cy.wait(2000)
        cy.get("button[onclick='logIn()']").click()
        cy.wait(2000)
        cy.get("#nameofuser").should("have.text", "Welcome test")//validation for username after log in
    })

    it("this is for signUp",function(){
        cy.visit("https://www.demoblaze.com/")
        cy.get("#signin2").click()
        cy.wait(2000)
        cy.get("#sign-username").type(userName)
        cy.wait(2000)
        cy.get("#sign-password").type(password)
        cy.wait(2000)
        cy.get("button[onclick='register()']").click()
        cy.wait(2000)
        cy.on("window:alerrt",function(alertText){
            expect(alertText).eql("sign up successful.")
        })
        cy.reload()
        
    })



})