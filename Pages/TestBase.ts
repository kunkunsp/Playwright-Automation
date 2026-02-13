import { test as driver } from "@playwright/test"; 
import { LoginPage } from '@pages/LoginPage';

const test = driver.extend<{
    loginPage: LoginPage //login retorna LoginPage 
   // dashboard: DashboardPage 
}>({
    loginPage: async ({ page }, use) => await use(new LoginPage(page))
    //dashboard: async ({page}, use) => await use(new DashboardPage(page)),
    //son los parametros de la funcion y => devuelve/retorna el "use"
});
export { test };