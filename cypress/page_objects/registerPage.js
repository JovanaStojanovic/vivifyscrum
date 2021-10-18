export default class RegisterPage {
    get title(){
        return cy.get('h1');
    }

    get signUpButton(){
        return cy.get('a').contains('Free Sign Up').first();
    }

    get checkboxInput(){
        return cy.get('input[type="checkbox"]');
    }

    get submitButton(){
        return cy.get('button[type="submit');
    }

    get errorMessage(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"]');
    }

    get registeredEmailErrorMessage(){
        return cy.get('div[class="el-message"]'); 
    }

    get myOrganizationDiv(){
        return cy.get('h2').eq(0);
    }
    get emailInput(){
        return cy.get('input[type="email"]');
    }
    get passwordInput(){
        return cy.get('input[type="password"]');
    }
    get userInput(){
        return cy.get('input[type="text"]').eq(1);
    }
    
    register(email, password, numberOfUsers){
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.userInput.type(numberOfUsers);
        this.checkboxInput.check({ force: true });
        this.submitButton.click();
    }  
    registerSkippedTerms(email, password, numberOfUsers){
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.userInput.type(numberOfUsers);
        this.checkboxInput.uncheck({ force: true });
        this.submitButton.click();
    }
}

export const registerPage = new RegisterPage();
 