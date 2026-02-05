const { test, exepc } = require ('@playwright/test');

test ('LocatMultElements', async ({page})=>{

    await page.goto('https://parabank.parasoft.com/parabank/index.htm;jsessionid=ABDD89053867AF9353509CD21D1FE2B5')

    /*const links = await page.$$('a');
    
    for(const link of links)
    {
        const linktest= await link.textContent();
        console.log(linktest);

    }*/
//Locate all the products display on home page

page.waitForSelector("//div[@id='rightPanel']//ul//li/a"); //another method call

const products = await page.$$("//div[@id='rightPanel']//ul//li/a")

    for (const product of products) {
        const prodName = await product.textContent();
        console.log(prodName);
    }
    
})