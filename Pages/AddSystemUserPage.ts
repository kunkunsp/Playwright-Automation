import type { Page, Locator } from '@playwright/test';
import { SuperPage } from '@pages/SuperPages';

export class AddSystemUserPage extends SuperPage {
    adminTab: Locator;
    addButton: any;
    userRoleOptionDropdown: Locator;
    employeeNameInputDropdown: Locator;
    statusOptionDropdown: Locator;
    usernameInput: Locator;
    passwordInput: Locator;
    confirmPasswordInput: Locator;
    saveButton: Locator;
  

constructor(page: Page) { 
    super(page);

    this.adminTab = page.locator('.oxd-main-menu').getByText('Admin',{ exact: true });
    this.addButton =  page.getByRole('button', { name:'Add'});
    
    this.userRoleOptionDropdown = page.locator('.oxd-grid-item', { hasText: 'User Role'});
    this.employeeNameInputDropdown = page.locator('.oxd-grid-item', { hasText: 'Employee Name' });
    this.statusOptionDropdown = page.locator('.oxd-grid-item', { hasText:'Status' });
    this.usernameInput = page.locator('.oxd-grid-item', { hasText: 'Username'});
    this.passwordInput = this.page.locator('xpath=//label[text()="Password"]/../following-sibling::div//input');
    this.confirmPasswordInput = this.page.locator('xpath=//label[text()="Confirm Password"]/../following-sibling::div//input');
    this.saveButton = page.locator('button[type=submit]', { hasText: 'Save' });
}       
async fillAddUserFields(arg?: {
    userRole?: 'Admin'|'ESS',
    employeeName?: string,
    status?: 'Enabled'|'Disable',
    username?: string,
    password?: string,
    confirmPassword?: string, 
}) {
    if (arg) { //Si los argumentos estan definidos se ejecutara la lista de codigos, pero por cada una que defina intentara, pero como tiene la condicional si no lo definimos no seguira.  
        arg.userRole && await this.selectDropdownOption(this.userRoleOptionDropdown, arg.userRole);
        arg.employeeName && await this.selectDropdownInput(this.employeeNameInputDropdown, arg.employeeName);
        arg.status && await this.selectDropdownOption(this.statusOptionDropdown, arg.status);
        arg.username && await this.input(this.usernameInput).fill(arg.username);
        if (arg.password) {
            await this.passwordInput.waitFor({ state: 'visible' }); // Espera activa
            await this.passwordInput.fill(arg.password);}
        if (arg.confirmPassword){
            await this.confirmPasswordInput.waitFor({ state: 'visible' });
            await this.confirmPasswordInput.fill(arg.confirmPassword);}
        }
    // Al final de tu método fillAddUserFields
    await this.saveButton.waitFor({ state: 'visible' });
    await this.saveButton.click();

    } 

async gotoAdminTab(){
    await this.adminTab.click();
    await this.expect(this.page).toHaveURL(/.*admin/);

    }
async gotoSaveSystemUser() {
    await this.addButton.click();
    await this.expect(this.page).toHaveURL(/.*saveSystemUser/);

    }   
}