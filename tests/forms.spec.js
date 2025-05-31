import { FormPage} from "../pages/Forms.js";


import { test, expect } from '@playwright/test';

let formPage;
test.describe('FormsPage Tests',()=>{


    test.beforeEach(async({page})=>{
  formPage=new FormPage(page);
  await formPage.goToApplication();
  await formPage.getFormPage();
  await formPage.getFormsPracticePage();

    })
    test('Verify practiceForm fields', async ({ page }) => {
       
        await expect(page).toHaveURL(/.*form/);
const fname=await formPage.setFirstName('John');
const lname=await formPage.setLastName('Doe');  
await formPage.setUserEmail('doe@gmail.com');
await formPage.setGender('Female');
await formPage.setNumber('1234567890');
await formPage.setDateOfBirth('1', 'January', '2000');
await formPage.setSubjects('English');
await formPage.setHobbies('Sports');
await formPage.setUploadPicture('/Users/raya/Downloads/Satya-Nani_1650460410531_resize.avif'); // Adjust the path to your test data


await formPage.setCurrentAddress('123  St, City, Suunvale');
await formPage.setState('NCR');
await formPage.clickSubmitButton(); // Click the submit button
await page.waitForTimeout(9000); // Wait for 2 seconds to see the filled form
const title=await formPage.getThankYouTitle();
    await expect(title).toEqual('Thanks for submitting the form');
    const cellData=await formPage.getCellValue(fname + ' ' + lname);  
    await expect(cellData).toEqual(fname + ' ' + lname); // Verify the full name in the table
    await page.waitForTimeout(2000); 


    })


})



//     test('Verify Forms Page Navigation', async ({ page }) => {
//         // Verify that the Forms page is displayed
//         await expect(page).toHaveURL(/.*forms/);
//         await expect(page.locator('text=Forms')).toBeVisible();
//     });
// });