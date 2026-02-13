import type { Page, Locator } from '@playwright/test';
import { SuperPage } from '@pages/SuperPages';

export class LoginPage extends SuperPage {
   readonly usernameInput: Locator;
   readonly passwordInput: Locator;
   readonly submitButton: Locator;

constructor(page: Page) { //Login page con sus elementos principales
    super(page);
    this.usernameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.submitButton = this.page.locator('button[type="submit"]');
}         
async login(username?: string, password?: string){ //Metodo Login, pasamos por parametro username y password
    username && await this.usernameInput.fill(username); //fill en plawright para poder tipiar una palabra
    password && await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');

}
async loginSuccess(){
    await this.goHome();
    
    const { username, password } = this.getCredentials() as { username: string, password: string };
   // Usamos 'as any' o definimos el tipo para forzar a TS a aceptar la desestructuración
    if (!username || !password) {
        throw new Error("❌ Error: No se encontraron las credenciales en el archivo .env");
    }

    // Al llegar aquí, TS ya sabe que username y password son strings
    await this.login(username, password); 
    
    // Usamos una expresión regular para que sea más flexible con la URL
    await this.expect(this.page).toHaveURL(/.*dashboard/);

    }
}