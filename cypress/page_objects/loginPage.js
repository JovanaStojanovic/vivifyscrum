export default class LoginPage {
    get title(){
        return cy.get('h1');
    }

    get loginButton(){
        return cy.get('button[type="submit"]');
    }

    get logoutButton(){
        return cy.get('div[class="vs-c-logout"]');
    }

    get errorMessage(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"]');
    }

    get errorCredentialsMessage(){
        return cy.get('span[class="el-form-item__error"]');
    }
    getCancelButton(name){
        return cy.get('button').contains(name);
    }

    getInputField(name){
        return cy.get(`input[type=${name}]`);
    }

    login(email, password){
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.loginButton.click();
    }
    loginNoPassword(email){
        this.getInputField('email').type(email);
        this.getInputField('password').clear();
        this.loginButton.click();
    }
    logout(){  
        cy.get('a[href="/account"]').click();
        cy.get('a[href="/account/settings"]').click();
        this.logoutButton.click();
    }
}

export const loginPage = new LoginPage();
