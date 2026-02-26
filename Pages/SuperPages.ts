import { expect, type Page, type Locator,type Expect} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
//*Los TS tiene como particularidad los tipados
//* ?: significa opcional

const USERNAME = process.env.ORANGE_USERNAME;
const PASSWORD = process.env.ORANGE_PASSWORD;

export class SuperPage { // 1. Declaramos las propiedades una sola vez
    protected page: Page;/*esta clase tiene una propiedad que se llama page y tiene la interfaz de page de playwright*/
    popup: (text?: string) => Locator;
    username: string | undefined;
    password: string | undefined;
    expect: Expect;
    optionDropdown: (contextElement: Locator) => Locator;
    autoinputDropdown: (contextElement: Locator) => Locator;
    dropdown: (contextElement: Locator) => Locator;
    dropdownOptions: (contextElement: Locator) => Locator;
    input: (contextElement: Locator) => Locator;


    constructor(page: Page) { // 2. Asignamos los valores dentro del único constructor
        this.page = page; 
        this.expect = expect
        this.username = USERNAME;
        this.password = PASSWORD;

        //*  Utilizades del localizador: Definición del localizador para el popup
        this.popup = (text?: string) => this.page.getByRole('dialog', {name: text});
        this.optionDropdown = (contextElement: Locator) => contextElement.locator('.oxd-select-text-input');
        this.autoinputDropdown = (contextElement: Locator) => contextElement.locator('input');
        this.dropdown = (contextElement: Locator) => contextElement.getByRole('listbox');
        this.dropdownOptions = (contextElement: Locator) => this.dropdown(contextElement).getByRole('option').filter({ hasNotText:'-- Select --'});
        this.input = (contextElement: Locator) => contextElement.locator('.oxd-input');
        
    }

    getCredentials(){ //se podra detener el test antes que haya un problema
        const username = this.username;
        const password = this.password;
        if(!username || !password) {
            throw new Error('Missing Credentiales in ENV Vars');
        }
        return { username,password};    // El return debe ir DESPUÉS de la llave del if
      
    }
    async goHome() {
        await this.page.goto('/');
    }

        async getPoppup (name?: string) { //* Metodo para tener el popup vasado en el nombre /aplicamos polimorfismo        
         const popup = this.popup(name);    
         await expect(popup).toBeVisible();
         return popup;
    }
    async selectDropdownOption(contextElement: Locator, option:string){
        await contextElement.waitFor({ state: 'visible' });
        await this.optionDropdown(contextElement).click();
        const dropdown = this.dropdown(contextElement);
        await this.expect(dropdown).toBeVisible(); //vamos a esperar que cada elemento sea visible 
        await this.expect(dropdown).toHaveAttribute('loading', 'false');
        await this.dropdownOptions(contextElement).filter({hasText: option}).first().click();
        await this.expect(dropdown).not.toBeVisible();
    }
    async selectDropdownInput(contextElement: Locator, searchingText: string){
        await this.autoinputDropdown(contextElement).fill(searchingText);
        const dropdown = this.dropdown(contextElement);
        await this.expect(dropdown).toBeVisible(); //vamos a esperar que cada elemento sea visible 
        await this.dropdownOptions(contextElement).filter({ hasText: searchingText }).first().click(); 
        await this.expect(dropdown).not.toBeVisible();
    }

}