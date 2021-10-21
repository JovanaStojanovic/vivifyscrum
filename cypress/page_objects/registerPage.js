export default class RegisterPage {
    get signUpButton(){
        return cy.get('a').contains('Free Sign Up').first();
    }

    get title(){
        return cy.get('h1');
    }

    get submitButton(){
        return cy.get('button[type="submit');
    }

    get errorMessage(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"]');
    }

    get registeredEmailErrorMessage(){
        return cy.get('div[class="el-message el-message-fade-enter-active el-message-fade-enter-to"]'); 
    }

    get myOrganizationDiv(){
        return cy.get('h2').eq(0);
    }

    getInputField(name){
        return cy.get(`input[type=${name}]`);
    }
    
    register(email, password, numberOfUsers){
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.getInputField('text').eq(1).type(numberOfUsers);
        this.getInputField('checkbox').check({ force: true });
        this.submitButton.click();
    }  
    registerNoPassword(email, numberOfUsers){
        this.getInputField('email').type(email);
        this.getInputField('password').clear();
        this.getInputField('text').eq(1).type(numberOfUsers);
        this.getInputField('checkbox').check({ force: true });
        this.submitButton.click();
    }  
    registerSkippedTerms(email, password, numberOfUsers){
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.getInputField('text').eq(1).type(numberOfUsers);
        this.getInputField('checkbox').uncheck({ force: true });
        this.submitButton.click();
    }
}

export const registerPage = new RegisterPage();
 