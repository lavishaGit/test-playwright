import {test, expect, chromium} from '@playwright/test';

async function goToApplication(page){
   const url= await page.goto("https://demoapps.qspiders.com/ui/auth?sublist=0");
    console.log(`page URL 
        ${url}`)
    expect(page).toHaveURL(/qspiders/); // Verify the URL contains 'qspiders'
}


test('verify Basic Authentication',async({})=>{
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin'
        }
      });
    const page = await context.newPage();
   await goToApplication(page);

   await page.goto('https://demoapps.qspiders.com/ui/auth'); // Replace with your main page
 
   const [popupPage] = await Promise.all([
    page.waitForEvent('popup'),       // Wait for the new tab in the correct context
page.click('#AuthLink')              // Trigger the popup by clicking
   ]);
  

//const authPage =await context.newPage()
await popupPage.waitForTimeout(5000);
await expect(popupPage.url()).toContain('basic-auth'); // This will give you the URL of the popup page

await browser.close(); // Close the browser after the test
})

function createAuthHeader(username, password) {
    return 'Basic '+ btoa(username +':'+ password);
}
test('auth test', async()=>{

    const browser = await chromium.launch({headless: false});
    const context= await browser.newContext();
    const page = await context.newPage();
    const username = 'admin';
    const password = 'admin';
    page.setExtraHTTPHeaders({Authorization : createAuthHeader(username, password)});

    await page.goto('https://the-internet.herokuapp.com/basic_auth');

})

