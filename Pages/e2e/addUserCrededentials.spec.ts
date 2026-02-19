import { expect, test } from "@TestBase";

test.describe("Test-admin | Agegar credenciales de usuario al empleado", ()=>{

    test.beforeEach(async ({ loginPage, addUserPage})=>{ //beforeEach cada vez que se ejecute la prueba debe de iniciar sesion
    await loginPage.loginSuccess();
    await addUserPage.gotoAdminTab();
      });

  test('Test-admin:TC1: Shoul add user credentials for employee', async ({ addUserPage }) => {
    await addUserPage.gotoSaveSystemUser();
    await addUserPage.fillAddUserFields({
      userRole: 'Admin',
      employeeName: 'peter',
      status: 'Enabled',
      username: 'SofiaAngel',
      password: 'SofiaAngel12345',
      confirmPassword: 'SofiaAngel12345', 
    });

  });
        
});   