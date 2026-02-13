import { test } from "@TestBase";

test.describe("Test-admin | Agegar credenciales del usuario", ()=>{

    test.beforeEach(async ({loginPage})=>{ //beforeEach cada vez que se ejecute la prueba debe de iniciar sesion
    await loginPage.loginSuccess()
      });

  test('Test-admin:TC1: Credentials', async ()=>{
    console.log('Aun falta');
  })
        
});