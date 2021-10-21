///<reference types="Cypress" />

import {registerPage} from './../page_objects/registerPage';
const faker = require('faker');

describe("register tests", () => {
    let userRegisterData = {
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password(),
        randomUserNumber: faker.datatype.number({ min: 1, max: 10 }),
        randomLettersUserField:faker.name.findName()
    }
    let registeredEmail = "jovana.stojanovic96@hotmail.com";
    let shortPassword=4;
    let shortNumberOfUsers=0;
    let bigNumberOfUsers=11;

    beforeEach("visit register page", () => {
        cy.intercept(
            "GET",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/pricing-plans-1",
            ()=>{}
        ).as("registration");

        cy.visit("https://cypress-api.vivifyscrum-stage.com/pricing"); 
        registerPage.signUpButton.click({ force: true });
        registerPage.getInputField('email').should('be.visible');
        registerPage.title.should('have.text', 'Account Details:');
        
        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/register",
            ()=>{}
        ).as("registerUser");
    });


    it("register with empty password field", ()=>{
        registerPage.registerNoPassword(userRegisterData.randomEmail, userRegisterData.randomUserNumber); 
        registerPage.errorMessage.should('have.text', 'The password field is required');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    it("register with skipped accepted terms, all other fields valid", ()=>{
        registerPage.registerSkippedTerms(userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        registerPage.getInputField('checkbox').should('not.be.checked');
        registerPage.errorMessage.should('have.text', 'The agree to terms and privacy policy field is required');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid email - missing first part before @", ()=>{
        registerPage.register("@yahoo.com", userRegisterData.randomPassword, userRegisterData.randomUserNumber);  
        registerPage.errorMessage.should('have.text', 'The email field must be a valid email');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid email - missing @", ()=>{
        registerPage.register("js14015141yahoo.com", userRegisterData.randomPassword, userRegisterData.randomUserNumber);   
        registerPage.errorMessage.should('have.text', 'The email field must be a valid email');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');});

    it("register with invalid email - missing .", ()=>{
        registerPage.register("js140151452@yahoocom", userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        registerPage.errorMessage.should('have.text', 'The email field must be a valid email');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid email - additional space", ()=>{
        registerPage.register("js140151452 @yahoocom", userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        registerPage.errorMessage.should('have.text', 'The email field must be a valid email');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid email that contains more than one @", ()=>{
        registerPage.register("js@1401514112@yahoo.com", userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        registerPage.errorMessage.should('have.text', 'The email field must be a valid email');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');});

    it("register with invalid password that contains less than minimum of 5 characters", ()=>{
        registerPage.register(userRegisterData.randomEmail, shortPassword, userRegisterData.randomUserNumber); 
        registerPage.errorMessage.should('have.text', 'The password field must be at least 5 characters');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid number of users that contains less than minimum of 1 user", ()=>{
        registerPage.register(userRegisterData.randomEmail, userRegisterData.randomEmail, shortNumberOfUsers); 
        registerPage.errorMessage.should('have.text', 'The number of users must be between 1 and 10');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid number of users that contains more than maximum of 10 users", ()=>{
        registerPage.register(userRegisterData.randomEmail, userRegisterData.randomEmail, bigNumberOfUsers); 
        registerPage.errorMessage.should('have.text', 'The number of users must be between 1 and 10');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with invalid number of users that contain letters instead of numbers", ()=>{
        registerPage.register(userRegisterData.randomEmail, userRegisterData.randomEmail, userRegisterData.randomLettersUserField); 
        registerPage.errorMessage.should('have.text', 'The number of users field must be an integer');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with already registered email", ()=>{
        registerPage.register(registeredEmail, userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        registerPage.registeredEmailErrorMessage.should('have.text', 'User with that email already exists');
        cy.url().should('contains', '/sign-up?type=monthly&plan=1&event=page-card');
    });

    it("register with correct credentials, all fields valid", ()=>{
        registerPage.register(userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomUserNumber); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        }) 
        cy.url().should('contains', '/my-organizations');
        registerPage.myOrganizationDiv.should('have.text', 'My Organization');
    })

})


