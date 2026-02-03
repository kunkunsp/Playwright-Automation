// const {tests,expect} = requiere('@playwritgh/tests')
import {test,expect} from '@playwright/test'

test('Locators', async ({page})=>{

    await page.goto("https://www.demoblaze.com/")

    //click on login button (click en el boton de login) -property 
    //await page.locator('id=login2').click()
    await page.click('id=login2')
 
    //provide uername -css
    //await page.locator('#loginusername').fill("pavanol")
    await page.fill('#loginusername','pavanol')
    //await page.type('#loginusername','pavanol')

    //provide password -css
    await page.fill("input[id='loginpassword']",'test@123')

    //click on login button -Xpath
    await page.click("//button[normalize-space()='Log in']")

    //verify logout link presence -Xpath
//await page.locator("//a[normalize-space()='Log out']")
const logautlink= await page.locator("//a[normalize-space()='Log out']")

await expect(logautlink).toBeVisible();

await page.close()

})   