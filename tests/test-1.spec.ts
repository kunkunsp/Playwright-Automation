import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dgoogle%26oq%3Dgoogle%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDE3OTNqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DCrF8afL1M_WNxc8PltjC2QE&q=EgRPmcAOGIvi8ssGIjAKKI4l9vKCgym8_IMDsEdy59Sj9i_80FaCQ8-29abudXgw5qlcmVc846umchn809cyAVJaAUM');
  await page.locator('iframe[name="a-fn6kkil52mg4"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="12"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="13"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="14"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="5"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="8"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="9"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="7"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-fn6kkil52mg4"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Rechazar todo' }).click();
  await page.getByRole('combobox', { name: 'Buscar' }).click();
  await page.getByRole('combobox', { name: 'Buscar' }).click();
});