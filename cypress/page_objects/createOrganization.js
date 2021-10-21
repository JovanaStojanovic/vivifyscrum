export default class CreateOrganization {
    get pageTitle(){
        return cy.get('div[class="vs-l-sprint__name vs-u-cursor--default"]');
    }

    get addOrganizationButton(){
        return cy.get('div[class="vs-c-my-organization__content"]').last({ force: true });
    }

    get dialogTitle(){
        return cy.get('h2[class="vs-c-modal__title"]');
    }

    get logoTitle(){
        return cy.get('h4');
    }

    get errorMessage(){
        return cy.get('div[class="el-message"]');
    }

    get boardsTitle(){
        return cy.get('p[class="vs-c-boards-item__title"]');
    }

    get organizationList(){
        return cy.get('span[class="vs-c-list__oragnisation-item"]').last();
    }

    get uploadButton(){
        return cy.get('div[class="el-upload-dragger"]');
    }

    getInputField(name){
        return cy.get(`input[type=${name}]`);
    }
    getButton(name){
        return cy.get('button').contains(name);
    }

    createOrganizationNoLogo(name){
        this.addOrganizationButton.click();
        this.getInputField("text").type(name);
        this.getButton('Next').click();
        this.getButton('Create').click();
    }
    createOrganizationWithLogo(name, logo){
        //this.getButton('OK').click();
        this.addOrganizationButton.click();
        this.getInputField("text").type(name);
        this.getButton('Next').click();
        this.uploadButton.click();
        this.getInputField("file").attachFile(logo);
        this.getButton('Create').click();
       
    }

}

export const createOrganization = new CreateOrganization();

