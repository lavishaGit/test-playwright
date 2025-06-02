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
test.only('verify New Window ', async ({page}) => {

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







})