import { test as driver } from "@playwright/test"; 
import { LoginPage } from '@pages/LoginPage';
import { AddSystemUserPage } from "./AddSystemUserPage";

// 1.Definimos los tipos de nuestras Fixtures
type MyFixtures = {
    loginPage: LoginPage;
    addUserPage: AddSystemUserPage;
};
// 2. Extendemos el test base con nuestras páginas
export const test = driver.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    addUserPage: async ({ page }, use) => { 
        await use(new AddSystemUserPage(page));
    },    
});

// 3. Exportamos el expect original para que no haya conflictos
export const expect = test.expect;