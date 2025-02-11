//Mocha framework - describe and it

import Login from '../pageObjects/login'

import SignUp from '../pageObjects/signup'

const {generateUsername} = require('unique-username-generator')

const generator = require('generate-password')

let userName = generateUsername()

let password = generator.generate({
    length: 5,
    numbers: true,
    uppercase: true,
})

const url = 'https://www.demoblaze.com/'

let loginPage = new Login()//creating an objectsfor the login

let signUpProcess = new SignUp()


describe("This is my first Cypress Test", function(){
    it("This will check navigation to page given", function(){
        cy.visit(url)
        loginPage.loginOption().should('be.visible').click()
        cy.wait(2000) //to pause the execution in cypress
        loginPage.userName().type('test')
        cy.wait(2000)
        loginPage.password().type('test')
        cy.wait(2000)
        loginPage.loginButton().click()
        cy.wait(2000)
        cy.get('a[id="nameofuser"]').should('have.text', 'Welcome test')  //Validation of the username after successful login
    })
 
    it('Test to add a new user for SignUp process', function(){
        cy.visit(url)
        signUpProcess.signUpOption().click()
        cy.wait(2000)
        signUpProcess.signUpUserName().type(userName)
        cy.wait(2000)
        signUpProcess.signUpPassword().type(password)
        cy.wait(2000)
        signUpProcess.signUpButton().click()
        cy.wait(2000)
        cy.on('window:alert', function(alertText){
            expect(alertText).eql('Sign up successful.')
        })
        cy.reload()
    })


    it('Add an item to cart', function(){
        cy.visit(url)
        cy.get('#login2').click() 
        cy.wait(2000)  // to pause the execution in cypress 
        cy.get("input[id='loginusername']").type(userName)
        cy.wait(2000)
        cy.get("input[id='loginpassword']").type(password)
        cy.wait(2000)
        cy.get("button[onClick='logIn()']").click()
        cy.wait(2000)
        cy.get('a[href="prod.html?idp_=1"][class="hrefch"]').click()
        cy.wait(2000)
        cy.get('a[onclick="addToCart(1)"]').click()
        cy.wait(2000)
        cy.on('window:alert', function(productAdded){
            expect(productAdded).eql('Product added.')
        })
        cy.reload()
        cy.wait(2000)
        cy.get('a[id="cartur"]').click()
        cy.wait(2000)
        cy.get('img[src="imgs/galaxy_s6.jpg"]').should('be.visible')
    })


    it('Use of custom commands', ()=>{
        cy.visit(url)
        cy.wait(2000)
        cy.nextPage()
        cy.wait(2000)
        cy.previousPage()
        cy.wait(2000)
    })

})

 