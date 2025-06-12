import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/Widgets';

let widgetsPage = null;

//Helper function defined properly
async function goToApplicationURL(page, applicationURL) {
    await page.goto(applicationURL); // Navigate to the application URL
    console.log('Navigated to application: ' + applicationURL);
}

test.beforeEach(async ({ page }) => {
    await goToApplicationURL(page, 'https://demoqa.com/');
    console.log('Before each test: Navigated to application');
    widgetsPage = new WidgetsPage(page);
    await widgetsPage.clickOnWidgetsLink();
})

test('verifyAccordion', async ({ page }) => {
    await widgetsPage.clickOnAccordionLink();
    await expect(page).toHaveURL(/.*accordian/);
    const firstAccHead = await widgetsPage.getFirstAccordionHeader();
    await expect(await firstAccHead.textContent()).toContain('What is Lorem Ipsum?');
    await widgetsPage.getFirstAccordionHeader().click();

    await expect(await widgetsPage.getFirstAccordionContent()).toContain('Lorem Ipsum is simply dummy text');
    await expect(await widgetsPage.getSecondAccordionContent()).toBeHidden(); // Verify the second accordion content is hidden
})

test('verifyAutoComplete', async ({ page }) => {
    const colors = ['Red', 'Green', 'Blue'];
    await widgetsPage.clickOnAutoCompleteLink();
    await expect(page).toHaveURL(/.*auto-complete/);
    for (let color of colors) {
        await widgetsPage.enterColorInput(color);

        await page.waitForTimeout(2000);
        //await expect(await widgetsPage.getInputText()).toContain(color);// Verify the single color results contain the entered color
        await widgetsPage.getSingleColorResults(); // Click on the single color result

        await page.waitForTimeout(2000); // Verify the input text contains the selected color
    }
    await Promise.all(
        colors.map(async (color) => {
            await expect(await widgetsPage.getInputBoxMultiBoxText()).toContain(color);
        })

    )
})
test('verifySlider', async ({ page }) => {
    await widgetsPage.clickOnSliderLink();
    await expect(page).toHaveURL(/.*slider/);
    const initialValue = await widgetsPage.getsliderValue();
    console.log('Initial Slider Value: ' + initialValue);
    while (await widgetsPage.getsliderValue() != 45) {
        await widgetsPage.pressSliderArrowKey('ArrowRight'); // Press the right arrow key to increase the slider value
        await page.waitForTimeout(200); // Wait for the slider to update
    }

    const updatedValue = await widgetsPage.getsliderValue();
    console.log('Updated Slider Value: ' + updatedValue);

    await expect(updatedValue).toEqual("" + 45); // Verify that the slider value has changed
})
test('verifyDatePicker', async ({ page }) => {

    await widgetsPage.clickOnDatePickerLink();
    await expect(page).toHaveURL(/.*date-picker/);

    const date = '25';
    const month = 'March';
    const year = '2000';
    const monthName = new Date(`${year}-${month}-${date}`).toLocaleString('en-US', {
        month: 'long',
    });
    await widgetsPage.clickOnDateLink(); // Click on the date picker input field
    await widgetsPage.setDateOfBirth(date, month, year); // Set the date of birth using the helper function
    const selectedDate = await widgetsPage.getSelectedDate(); // Get the selected date from the date picker
    console.log('Selected Date: ' + selectedDate);

    // Convert month name to numeric format  monthMap is just a simple object to map each full month name to its 2-digit number.
    const monthMap = {
        January: '01',
        February: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
    };

    const formattedMonth = monthMap[month]; // '03'
    await expect(await widgetsPage.getSelectedDate()).toContain(`${formattedMonth}/${date}/${year}`); // Verify that the selected date matches the expected format
}


)

test('verify dataPicker with date input', async ({ page }) => {
    await widgetsPage.clickOnDatePickerLink();
    await expect(page).toHaveURL(/.*date-picker/);

    //const date = '2023-10-01'; // Example date in YYYY-MM-DD format
    // await widgetsPage.setDateInput(date); // Set the date input field
    // const selectedDate = await widgetsPage.getSelectedDate(); // Get the selected date from the date picker
    // console.log('Selected Date: ' + selectedDate);

    // await expect(selectedDate).toContain(date); // Verify that the ())
    await widgetsPage.clickOnDateAndTimePickerLink().click();
    await widgetsPage.getTimePicker().filter({ hasText: '12:00' }).click();
    const updatedTime = await widgetsPage.clickOnDateAndTimePickerLink().inputValue();
    await expect(updatedTime).toContain('12:00'); // Verify that the time input field is set to '12:00'
    await page.waitForTimeout(3000)// Set the time input field
})
test('verifyPregressBar', async ({ page }) => {

    await widgetsPage.clickOnProgressBarLink();
    await expect(page).toHaveURL(/.*progress-bar/);
    await widgetsPage.clickOnStartButton();


    //const value=  await widgetsPage.getProgressBarValue();
    while (true) {
        const valueStr = await widgetsPage.getProgressBarValue(); // e.g., "40" or "40%"
        const valueNum = parseInt(valueStr);
        console.log(`Current progress: ${valueNum}%`);
        if (valueNum == 40) {
            await widgetsPage.clickOnStartButton(); // Click on the Start button
            console.log('Progress bar reached 40%');
            break;
            // Exit the loop when the progress bar reaches 100%
        }


    }

    await page.waitForTimeout(2000); // Wait for the progress bar to complete
})


test('verifyTabs', async ({ page }) => {
    await widgetsPage.clickOnTabsLink();
    await expect(page).toHaveURL(/.*tabs/);
    //await widgetsPage.clickOnWhatTab();
    // Verify that the default tab is selected and visible
    // Verify the first tab is active
    //Clicking on a tab should activate it and display its associated content
    await expect(widgetsPage.getAllTab().nth(0)).toHaveClass(/active/);

    await expect(widgetsPage.getAllTab().nth(0)).toHaveClass(/active/); // Verify the first tab is active
    await expect(await widgetsPage.getWhatTabContent()).toContain('Lorem Ipsum is simply dummy text'); // Verify the content of the first tab

    //count and check all links workinh
    const count = await widgetsPage.allTabs.count();
    for (let i = 0; i < count; i++) {
        const tabText = await widgetsPage.getAllTab().nth(i).textContent();
        console.log(`Tab ${i + 1}: ${tabText}`);
        await widgetsPage.allTabs.nth(i).click();
        if (await widgetsPage.getPopupCloseButton().isVisible()) {
            await widgetsPage.getPopupCloseButton().click();
        }


        await expect(widgetsPage.getAllTab().nth(i)).toBeVisible();

        await page.waitForTimeout(2000);
    }
})
test('verifyToolTips', async ({ page }) => {


    await widgetsPage.clickOnTooltipLink();
    await expect(page).toHaveURL(/.*tool-tips/);
    await widgetsPage.hoverOnTooltipButton();
    await expect(await widgetsPage.getTooltipText()).toBeVisible();
    await expect(await widgetsPage.getTooltipText()).toHaveText('You hovered over the Button');
})

test('verifyMenu', async ({ page }) => {
    await widgetsPage.clickOnMenuLink();
    await expect(page).toHaveURL(/.*menu/);
    await widgetsPage.hoverOnMenu2Link();
  const subList=  await widgetsPage.getAllSubMenu().filter({ hasText: 'SUB SUB LIST' });
    await widgetsPage.getAllSubMenu().filter({ hasText: 'SUB SUB LIST' }).hover();
    await page.waitForTimeout(4000);
    await expect(widgetsPage.getAllSubMenu().filter({ hasText: 'Sub Sub Item 1' })).toBeVisible();
   
    //  }
})
