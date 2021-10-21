///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
const faker = require('faker');

describe('login tests', ()=> {
    let userData = {
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password()
    }
    let correctEmail = "petar333@gmail.com";
    let correctPassword= "kisobran";

    beforeEach('visit login page', ()=>{
        cy.visit("/login");
        loginPage.getInputField('email').should('be.visible');
        loginPage.title.should('have.text', 'Log in with your existing account');
        
        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            ()=>{}
        ).as("loginUser");
    });

    it("just click login button, all fields empty", ()=>{
        loginPage.loginButton.click();
        cy.url().should('contains', '/login');
        loginPage.errorMessage.eq(0).should('be.visible').and('have.text', 'The email field must be a valid email');
        loginPage.errorMessage.eq(1).should('be.visible').and('have.text', 'The password field is required');
    });

    it("login with correct email, no password", ()=>{
        loginPage.loginNoPassword(correctEmail);
        cy.url().should('contains', '/login');
        loginPage.errorMessage.should('be.visible').and('have.text', 'The password field is required');
    });

    it("login with correct email, but wrong password", ()=>{
        loginPage.login(correctEmail, userData.randomPassword);
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(401);
        })
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    });

    it("login with not registered email", ()=>{
        loginPage.login(userData.randomEmail, userData.randomPassword);
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(401);
        })
        cy.url().should('contains', '/login');
        loginPage.errorCredentialsMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
    });

    it("login with correct credentials", ()=>{
        loginPage.login(correctEmail, correctPassword);
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        cy.url().should('contain', '/my-organizations');
    });

    it("logout", ()=>{
        loginPage.login(correctEmail, correctPassword);
        cy.wait('@loginUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        //loginPage.getCancelButton('Finish Registration').click();
        loginPage.logout();
        cy.url().should('contains', '/login');
        loginPage.title.should('have.text', 'Log in with your existing account');
    });
});
