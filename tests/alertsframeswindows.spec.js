import {test, expect} from '@playwright/test';
import {AlertsFramesWindowsPage} from '../pages/AlertsFramesWindows';
let alertsFramesWindowsPage=null;
test.describe('AlertsFramesWindowsPage Tests', () => {  



test.beforeEach(async ({page}) => {
    alertsFramesWindowsPage = new AlertsFramesWindowsPage(page);
    await alertsFramesWindowsPage.goToApplication();
    await alertsFramesWindowsPage.clickOnAlertsFramesWindows();
})


test('verify New Tab ', async ({page}) => {

await alertsFramesWindowsPage. clickOnBrowserWindow();
await expect(page).toHaveURL(/.*browser-windows/); 
const newTab=await Promise.all([
page.waitForEvent('popup'),
alertsFramesWindowsPage.clickOnNewTab()

])

await expect (newTab[0]).toHaveURL(/sample/);


})
test('verify New Window ', async ({page}) => {

    await alertsFramesWindowsPage. clickOnBrowserWindow();
    await expect(page).toHaveURL(/.*browser-windows/); 
    const newWindow=await Promise.all([
    page.waitForEvent('popup'),
    alertsFramesWindowsPage.clickOnNewWindow()
    
    ])
    
    await expect (newWindow[0]).toHaveURL(/sample/);
    
    
    })



test('verify Frames', async ({page}) => {

    await alertsFramesWindowsPage.clickOnFramesLink();
    await expect(page).toHaveURL(/.*frames/);
    const frameCount=await page.frames().length;

    console.log(`Total number of frames on the page: ${frameCount}`); //18 frames 
    const head = await alertsFramesWindowsPage.getFrameHeading();
    const exp = await head.textContent();
    await expect (exp).toContain('This is a sample page'); // Verify the frame heading text


    const head2 = await alertsFramesWindowsPage.getFrame2Heading();
    const exp2 = await head2.textContent();
    await expect (exp2).toContain('This is a sample page'); // Verify the frame heading text


})
test.only('verify Alerts',async ({page})=>{

await alertsFramesWindowsPage.getAlertsLink().click();
await expect(page).toHaveURL(/.*alerts/); // Verify the URL contains 'alerts'
 // Click on the Alert button

await page.once('dialog', async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // Accept the alert dialog
})

await alertsFramesWindowsPage.clickOnAlertButton().click();


// await page.on('dialog', async (dialog) => {

//     console.log(`Dialog message: ${dialog.message()}`);  // registered dialog event listener
//     await dialog.accept(); // Accept the timer alert dialog

// })



// await alertsFramesWindowsPage.clickOnTimerAlertButton().click();
// await page.waitForTimeout(5000); // optional, only if you want to visibly wait
// await alertsFramesWindowsPage.clickOnConfirmButton().click();
// await expect(await alertsFramesWindowsPage.getConfirmResult()).toHaveText("You selected Ok") // Click on the Confirm button
// trigger

page.once('dialog', async (dialog) => {
    console.log(`Prompt Alert: ${dialog.message()}`);
    await dialog.accept('Lavisha'); // Provide input text to the prompt
  });
  await alertsFramesWindowsPage.clickOnPromptButton().click();


})

})