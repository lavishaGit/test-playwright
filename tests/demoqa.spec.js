import {test, expect} from '@playwright/test';
import {DashboardPage} from '../pages/Dashboard';
import {convertHexToRGB} from '../utils/commonfunctions'
let dashboardPage ;
test.describe('DemoQA DashboardPage Tests',()=>{
    test.beforeEach(async ({ page }) => {
      dashboardPage = new DashboardPage(page);
        await dashboardPage.goToApplication();
      });

test('Verify all links on DashboardPage', async ({page})=>{
   

// await dashboardPage.getAlllinksSize().then(async (size) => {
//     console.log(`Total number of links on DashboardPage: ${size}`);
//     expect(size).toBeGreaterThan(0); // Check if there are any links
    
//     });
    
    
    const size = await dashboardPage.getAlllinksSize();
  console.log(`Total number of links on DashboardPage: ${size}`);

  expect(size).toBeGreaterThan(0); // Assert there's at least one link
  const linksText=await dashboardPage.getAllLinksContent();
  for(let link of linksText){
console.log(`Links:${link.href},IsDispalyed :${link.IsDisplayed}`)
if(link.href==null){
console.log("Link is null, skipping display check");
continue; // Skip if href is null
// Assert that href is not null or empty
}
try {
   /// const response = await page.evaluate(async (link) => {
        //const href = link.getAttribute('href');
        const result = await fetch(link.href, { method: 'HEAD' });
     //  return { status: result.status, href: link.href };
   // }, link);
    if (result.status >= 400) {
        console.log(`Link ${link.href} is a broken link`);
    } else {
        console.log(`Link ${link.href} is a working link`);
    }
    } catch (error) {
        console.log(`An error occurred while checking link ${link.href}: ${error.message}`);
    }
expect(link.href).toBeTruthy(); // Assert that href is not null or empty
expect(link.IsDisplayed).toBe(true); // Assert that each link is displayed
  }
})
  test('verifyColorOfIcons', async () => {
    const rgbColors = convertHexToRGB("#01a0e0");
    console.log('RGB Colors:', rgbColors);

    await dashboardPage.getIcons().then(async (icons) => {

        await expect(icons.length).toBe(6); // Assert that there are icons length of 6   //length as icons is array
        for (let icon of icons) {
          
           await  expect(icon).toHaveCSS("color",`rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`) // Assert that the icon color matches the expected RGB color
        }

    })

})
        // iconColors.forEach(color => {
        //     expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/); // Assert that each color is a valid hex code
     //});
     //   }

    


    test.only('verify Navigations of Links on DashboardPage ', async ({page})=>{
        await dashboardPage.getCardsText().then(async (texts)=>{
     const textsToVerify=[
        "Elements",
        "Forms",
        "Alerts, Frame & Windows",
        "Widgets",
        "Interactions",
        "Book Store Application"
     ]
   for(let text of texts){
   console.log(`All texts :${text}`)
   expect   (textsToVerify).toContain(text); // Assert that each text is in the expected texts

   }
        })
        await dashboardPage.getCards().then(async (cards) => {

      for(let card of cards){
        await card.click(); // Click on each card
      let pageTitle= await page.title();
     
        console.log(`Navigated to page with title: ${pageTitle}`);
        expect(pageTitle).toContain('DEMOQA')// Assert that the page title is not empty
        let url= await page.url();
        console.log(`Current URL: ${url}`);
        expect(url).toContain('demoqa'); // Assert that the URL contains 'demoqa.com'
await page.goBack(); // Navigate back to the DashboardPage
      }


        })

 
})


})
