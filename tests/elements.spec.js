import { link } from "fs";
import fs from "fs";
import ElementsPage from "../pages/Elements.js";


import { test, expect } from '@playwright/test';

let elementsPage;
test.describe('FormsPage Tests',()=>{


    test.beforeEach(async({page})=>{
        elementsPage=new ElementsPage(page);
  await elementsPage.goToApplication();
  await elementsPage.clickOnElementPage();
 

    })

    test('Verify valid image and Broken image', async ({ page }) => {
        await elementsPage.clickOnBrokenLinkPage();
 

   await expect(page).toHaveURL(/.*broken/);   //.* — means any character (.) repeated zero or more times (*).
   const validImage=await elementsPage.getValidImage();
   //visual testing
   await expect(validImage).toHaveScreenshot('validImage.png'); // Verify the valid image is displayed correctly
//functinal testing
await expect(validImage).toBeVisible(); // Verify the valid image is visible
await expect(validImage).toBeTruthy(); // Verify the valid image is truthy (exists)

const brokenImage=await elementsPage.getBrokenImage();
//visual testing
await expect(brokenImage).toHaveScreenshot('brokenImage.png'); // Verify the broken image is displayed correctly
//functional testing        
await expect(brokenImage).toBeVisible(); // Verify the broken image is visible
// await expect(brokenImage).toBeFalsy() // Verify the broken image is truthy (exists)
 
    })

   

test('Verify broken link', async ({ page }) => {
    await elementsPage.clickOnBrokenLinkPage();
    const links= await elementsPage.getAllLinks();
    const count= await links.count();

    console.log(`Total number of links on ElementsPage: ${count}`);
    expect(count).toBeGreaterThan(0); // Assert there's at least one link
for(let i =0;i<count;i++){
const link = await elementsPage.links.nth(i).getAttribute('href');
if(link){
    try{
        const result = await fetch(link, { method: 'HEAD' });
        if (result.status >= 400) {
            console.log(`Link ${link} is a broken link`);
            await expect(result.status ).toBeGreaterThanOrEqual(400) ;// Assert that the link is not broken
        } else {
            console.log(`Link ${link} is a working link`);
        }
        } catch (error) {
            console.log(`An error occurred while checking link ${link}: ${error.message}`);
        }


    }


}
})


test('Verify downloaded file', async ({ page }) => {
await  elementsPage.clickOnUploadDownloadLink();




const download=await Promise.all([

page.waitForEvent('download'), // Wait for the download event
elementsPage.clickOnDownloadButton() // Click the download button
])
//gives temparary path of downloaded file
const path=await download[0].path();
console.log(`Downloaded file path: ${path}`);
expect(path).toBeTruthy();

//
const fileName = download[0].suggestedFilename();
console.log(`Downloaded filename: ${fileName}`);
await download[0].saveAs(fileName);
await expect(fileName).toBe('sampleFile.jpeg'); // Verify the downloaded file name


})})