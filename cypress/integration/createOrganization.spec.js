///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import {createOrganization} from './../page_objects/createOrganization';
const Formats = require('../fixtures/Formats.json');
const faker = require('faker');

describe('create organization tests', ()=> {
    beforeEach('log into the app', () => {
        cy.intercept(
            "GET",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/pricing-plans-1",
            ()=>{}
        ).as("registration");

        cy.visit("/login");
        loginPage.login("petar333@gmail.com", "kisobran");
        

        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            ()=>{}
        ).as("createOrganization");
    });
    
    let randomOrganizationTitle=faker.name.title();
    

    it("user able to see create organization option, next button disabled when title empty",()=>{
        cy.url().should('contain', '/my-organizations');
        createOrganization.pageTitle.should('have.text', 'My Organizations');
        createOrganization.addOrganizationButton.click();
        createOrganization.dialogTitle.should('have.text', ' New Organization');
        createOrganization.getButton('Next').should('be.disabled');
    });

    it("create organization without logo", ()=>{
        createOrganization.createOrganizationNoLogo(randomOrganizationTitle);
        cy.wait('@createOrganization').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        createOrganization.organizationList.should('have.text', randomOrganizationTitle.charAt(0) + " " + randomOrganizationTitle + " ");
        cy.url().should('contain','/boards');
    });

    it("create organization with invalid .eps format", ()=>{
        createOrganization.createOrganizationWithLogo(randomOrganizationTitle, cy.readFile("cypress/fixtures/Sunflowers.eps"));
        cy.wait('@createOrganization').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contain', '/my-organizations');
        createOrganization.errorMessage.should('have.text', "The file must be a file of type: png, jpg, gif, jpeg.");
    });

    it("create organization with valid .jpg format", ()=>{
        createOrganization.createOrganizationWithLogo(randomOrganizationTitle, cy.readFile("cypress/fixtures/Sunflowers.jpg"));
        cy.wait('@createOrganization').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        createOrganization.organizationList.should('have.text', randomOrganizationTitle.charAt(0) + " " + randomOrganizationTitle + " ");
        cy.url().should('contain','/boards');
        createOrganization.boardsTitle.should('have.text', 'Add new Board');
    });


//NOT FINISHED, FIRST TO REALIZE HOW TO UPLOAD A FILE!

    // it("create organization with invalid .tift format", ()=>{
    //     createOrganization.createOrganizationInvalidLogo(organizationData.randomTitle, organizationData.randomUrlTift);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(422);
    //     })
    //     cy.url().should('contain', '/my-organizations');
    //     createOrganization.errorMessage.should('have.text', "The file must be a file of type: png, jpg, gif, jpeg.");
    // });
    // it("create organization with invalid .tift format", ()=>{
    //     createOrganization.createOrganizationInvalidLogo(organizationData.randomTitle, organizationData.randomUrlTift);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(422);
    //     })
    //     cy.url().should('contain', '/my-organizations');
    //     createOrganization.errorMessage.should('have.text', "The file must be a file of type: png, jpg, gif, jpeg.");
    // });
    // it("create organization with invalid .html format", ()=>{
    //     createOrganization.createOrganizationInvalidLogo(organizationData.randomTitle, organizationData.randomUrlHtml);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(422);
    //     })
    //     cy.url().should('contain', '/my-organizations');
    //     createOrganization.errorMessage.should('have.text', "The file must be a file of type: png, jpg, gif, jpeg.");
    // });

    // it("create organization with invalid .js format", ()=>{
    //     createOrganization.createOrganizationInvalidLogo(organizationData.randomTitle, organizationData.randomUrlJs);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(422);
    //     })
    //     cy.url().should('contain', '/my-organizations');
    //     createOrganization.errorMessage.should('have.text', "The file must be a file of type: png, jpg, gif, jpeg.");
    // });

    // it("create organization with valid .png format", ()=>{
    //     createOrganization.createOrganizationValidLogo(organizationData.randomTitle, organizationData.randomUrlPng);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(200);
    //     })
    //     cy.url().should('not.contain', '/my-organizations');
    //     createOrganization.boardsTitle.should('have.text', 'Add new Board');
    // });

    // it("create organization with valid .gif format", ()=>{
    //     createOrganization.createOrganizationValidLogo(organizationData.randomTitle, organizationData.randomUrlGif);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(200);
    //     })
    //     cy.url().should('not.contain', '/my-organizations');
    //     createOrganization.boardsTitle.should('have.text', 'Add new Board');
    // });

    // it("create organization with valid .jpeg format", ()=>{
    //     createOrganization.createOrganizationWithLogo(randomOrganizationTitle, organizationData.randomUrlJpeg);
    //     cy.wait('@createOrganization').then((interception)=> {
    //         expect(interception.response.statusCode).eq(200);
    //     })
    //     cy.url().should('not.contain', '/my-organizations');
    //     createOrganization.boardsTitle.should('have.text', 'Add new Board');
    // });
});
















