const { test, exepc } = require ('@playwright/test');

test ('LocatMultElements', async ({page})=>{

    await page.goto('https://parabank.parasoft.com/parabank/index.htm;jsessionid=ABDD89053867AF9353509CD21D1FE2B5')

    const links = await page.$$('a');
    
    for(const link of links)
    {
        const linktest= await link.textContent();
        console.log(linktest);

    }

})