import { expect, type Page, type Locator } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
//*Los TS tiene como particularidad los tipados
//* ?: significa opcional

const USERNAME = process.env.ORANGE_USERNAME ?? new Error("Missing USERNAME in env values")
const PASSWORD = process.env.ORANGE_PASSWORD ?? new Error("Missing PASSWORD in env values")


export class SuperPage { // 1. Declaramos las propiedades una sola vez
    protected page: Page;/*esta clase tiene una propiedad que se llama page y tiene la interfaz de page de playwright*/
    popup: (text?: string) => Locator;
    username: string | Error;
    password: string | Error;

    constructor(page: Page) { // 2. Asignamos los valores dentro del único constructor
        this.page = page; 
        this.username = USERNAME;
        this.password = PASSWORD;

        //*  Utilizades del localizador: Definición del localizador para el popup
        this.popup = (text?: string) => this.page.getByRole('dialog', {name: text});
    }

        async getPoppup (name?: string) { //* Metodo para tener el popup vasado en el nombre /aplicamos polimorfismo        
         const popup = this.popup(name);    
         await expect(popup).toBeVisible();
         return popup;
    }
}