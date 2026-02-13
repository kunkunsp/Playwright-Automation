import type { Page, Locator } from '@playwright/test';
import { SuperPage } from "Pages/SuperPages";

export class LoginPage extends SuperPage {
    usernameInput: Locator;
    passwordInput: Locator;
    sumitButton: Locator | undefined;

constructor(page: Page) { //Login page con sus elementos principales
    super(page);
    this.usernameInput = this.page.locator('input[name=username]');
    this.passwordInput = this.page.locator('input[name=password]');
    this.sumitButton = this.page.locator('input[type=submit]');
    }         
async login(username?: string, password?: string){ //Metodo Login, pasamos por parametro username y password
    username && await this.usernameInput.fill(username); //fill en plawright para poder tipiar una palabra
    password && await this.passwordInput.fill(password);
    await this.sumitButton?.click();
    await this.page.waitForLoadState('domcontentloaded');

}

}