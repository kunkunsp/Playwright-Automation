import { test as driver } from "@playwright/test"; 
import { LoginPage } from 'Pages/LoginPage';

driver.extend<{
    login: LoginPage //login retorna LoginPage 
   // dashboard: DashboardPage 
}>({
    login: async ({ page }, use) => await use(new LoginPage(page))
    //dashboard: async ({page}, use) => await use(new DashboardPage(page)),
    //son los parametros de la funcion y => devuelve/retorna el "use"
});