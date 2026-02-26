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
    this.employeeNameInputDropdown = page.locator('.oxd-autocomplete-text-input input');
    this.statusOptionDropdown = page.locator('.oxd-grid-item', { hasText:'Status' });
    this.usernameInput = page.locator('.oxd-grid-item', { hasText: 'Username'});
    this.passwordInput = this.page.locator('xpath=//label[text()="Password"]/../following-sibling::div//input');
    this.confirmPasswordInput = this.page.locator('xpath=//label[text()="Confirm Password"]/../following-sibling::div//input');
    this.saveButton = page.locator("button[type='submit']", { hasText: 'Save' });
}       
async fillAddUserFields(arg?: {
    userRole?: 'Admin'|'ESS',
    employeeName?: string,
    status?: 'Enabled'|'Disable',
    username?: string,
    password?: string,
    confirmPassword?: string, 
}) { // <--- Abre la función
    if (arg) { //<---Abre el bloque IF principal--Si los argumentos estan definidos se ejecutara la lista de codigos, pero por cada una que defina intentara, pero como tiene la condicional si no lo definimos no seguira.  
        // 1. Rol de usuario
        arg.userRole && await this.selectDropdownOption(this.userRoleOptionDropdown, arg.userRole);
        // 2. Employee Name 
    if (arg.employeeName) {//<--- Abre IF de employeeName
            await this.employeeNameInputDropdown.fill(arg.employeeName);
            // 1. Esperamos un momento a que el sistema reaccione al texto
            await this.page.waitForTimeout(5000);
            // 2. Usamos un selector más robusto para la sugerencia
            const suggestion = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first();
            // 3. Esperamos a que sea visible
            await suggestion.waitFor({ state: 'visible' });
            await suggestion.click();
            //suggestion: Esto hará que el mensaje "Invalid" desaparezca de la web de OrangeHRM.
    }  // <--- Cierra IF de employeeName  
        // 3. Status
        arg.status && await this.selectDropdownOption(this.statusOptionDropdown, arg.status);
        // 4. Username
        arg.username && await this.input(this.usernameInput).fill(arg.username);
        // 5. Passwords
        if (arg.password) {// <--- Abre IF de password
            await this.passwordInput.waitFor({ state: 'visible' }); // Espera activa
            await this.passwordInput.fill(arg.password);
        }//<--- Cierra IF de password
        // 6. Confirm Password
        if (arg.confirmPassword){// <--- Abre IF de confirm
            await this.confirmPasswordInput.waitFor({ state: 'visible' });
            await this.confirmPasswordInput.fill(arg.confirmPassword);
        }// <--- Cierra IF de confirm
        
         // pedimos que sea visible el boton, esperamos y clicamos
        await this.saveButton.waitFor({ state: 'visible' });
        await this.saveButton.click();
 } // <--- AQUÍ CIERRA EL "if (arg)" (Línea muy importante)

    return arg; //asi podemos retornar los argumentos fillAddUserFields

}// <--- AQUÍ CIERRA LA FUNCIÓN "async fillAddUserFields

async gotoAdminTab(){
    await this.adminTab.click();
    await this.expect(this.page).toHaveURL(/.*admin/);

    } //<---  Cierra gotoAdminTab
async gotoSaveSystemUser() {
    await this.addButton.click();
    await this.expect(this.page).toHaveURL(/.*saveSystemUser/);

    }   
}