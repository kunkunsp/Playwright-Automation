import { expect, test } from "@TestBase";
import { faker } from '@faker-js/faker'; 

test.describe("Test-admin | Agegar credenciales de usuario al empleado", ()=>{

    test.beforeEach(async ({ loginPage, addUserPage})=>{ //beforeEach cada vez que se ejecute la prueba debe de iniciar sesion
    await loginPage.loginSuccess();
    await addUserPage.gotoAdminTab();
      });

  test('Test-admin:TC1: Shoul add user credentials for employee', async ({ page, addUserPage }) => {
    
    await addUserPage.gotoSaveSystemUser();
    const expectedUsername = faker.internet.username();
    await addUserPage.fillAddUserFields({
      userRole: 'Admin',
      employeeName: 'Joseph  Evans',
      status: 'Enabled',
      username: expectedUsername,
      password: 'Password123!',
      confirmPassword: 'Password123!' 
    });
  
    await expect(page).toHaveURL(/.*viewSystemUsers/, { timeout: 10000 }); // promesa que se realiza - Le damos 10 segundos 

    const createUserInTable =  page.getByRole('table').getByText(expectedUsername); 
    await expect (createUserInTable).toBeVisible(); //Realizamos validaciones en el caso de prueba, "toBeVisible"=que sea visible
  });
        
});   