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

    constructor(page: Page) { // 2. Asignamos los valores dentro del único constructor
        this.page = page; 
        this.expect = expect
        this.username = USERNAME;
        this.password = PASSWORD;

        //*  Utilizades del localizador: Definición del localizador para el popup
        this.popup = (text?: string) => this.page.getByRole('dialog', {name: text});
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
}