const { test, expect } = require('@playwright/test');

test('Mi primera práctica en ParaBank', async ({ page }) => {
  // 1. Navegar a la web
  await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');

  // 2. Escribir en los campos de Login
  // Usamos 'locator' para identificar los elementos por su nombre (name)
  await page.locator('input[name="username"]').fill('mi_usuario');
  await page.locator('input[name="password"]').fill('mi_password');

  // 3. Hacer clic en el botón de Login
  await page.locator('input[value="Log In"]').click();

  // 4. Validar un mensaje de error (ya que el usuario no existe)
  const errorMessage = page.locator('.error');
  await expect(errorMessage).toBeVisible();
  
  console.log('Test ejecutado: Se validó que el login fallido muestra error.');
});