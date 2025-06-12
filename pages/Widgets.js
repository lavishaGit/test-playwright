export class WidgetsPage {
    constructor(page) {
        this.page = page;
        this.widgetsLink = page.locator(".category-cards >div:nth-child(4)");

        this.accordionLink = page.locator("text=Accordian");
        this.accordionFirstHeader = page.locator("#section1Heading");
        this.accordianFirstContent = page.locator("#section1Content");
        this.accordionSecondSection = page.locator("#section2Heading");
        this.accordionThirdSection = page.locator("#section3Heading");
        this.accordionSecondSectionContent = page.locator("#section2Content");
        this.autocompleteLink = page.locator("text=Auto Complete");
        // this.colorInput = page.locator(".css-1g6gooi");

        this.autoCompleteDropdown = page.locator(".auto-complete__menu-list");
        this.autoCompleteOption = page.locator('#react-select-2-option-0'); // Locator for the Auto Complete option
        this.inputText = page.locator('#autoCompleteMultipleInput');

        this.sliderLink = page.locator("text=Slider");
        this.slider = page.locator(".range-slider")
        this.sliderValue = page.locator("#sliderValue");
        this.datePickerLink = page.locator("text=Date Picker");
        this.dateInput = page.locator("#datePickerMonthYearInput");
        this.dateMonth = page.locator(".react-datepicker__month-select");
        this.dateYear = page.locator(".react-datepicker__year-select");
        this.date = page.locator(".react-datepicker__day"); // gives date of birth input field

        this.inputBoxMultiBox = page.locator('.auto-complete__multi-value__label')  // can return 1 elemnt if 1 value selected can give mutile value if many valuesselected 
        this.dateAndTimePicker = page.locator("#dateAndTimePickerInput"); // Locator for the date and time picker input
        this.timePicker = page.locator(".react-datepicker__time-list-item");

        this.progressBarLink = page.locator("text=Progress Bar");
        this.startBttn = page.locator(" #startStopButton");
        this.progressBar = page.locator("#progressBar");
        this.progressBarValue = page.locator("#progressBar>div");
        this.tabsLink = page.locator('span', { hasText: 'Tabs' })
        this.allTabs = page.locator("#tabsContainer > nav a");
        this.whatContent = page.locator("#demo-tabpane-what p");

        this.popupCloseButton = page.locator('div[aria-label="Close"]');
        this.tooltipLink = page.locator("text=Tool Tips");
        this.tooltipButton = page.locator("#toolTipButton");
        this.menuLink = page.locator('#item-7', { hasText: 'Menu' });
        this.menu2Link = page.locator('li a', { hasText: 'Main Item 2' });
        this.menu2Subs = page.locator('li ul li a');


        this.selectMenuLink = page.locator("text=Select Menu");






    }

    async clickOnMenuLink() {
        await this.menuLink.click(); // Click on the Tabs link
    }

    async hoverOnMenu2Link() {
        await this.menu2Link.hover(); // Click on the Tabs link
    }
    getAllSubMenu() {
        return this.menu2Subs; // Click on the Tabs link
    }

    async clickOnTooltipLink() {
        await this.tooltipLink.click(); // Click on the Tabs link
    }
    async hoverOnTooltipButton() {
        await this.tooltipButton.hover(); // Click on the Tabs link
    }
    async getTooltipText() {
        return await this.page.locator('.tooltip-inner')// Click on the Tabs link
    }
    getPopupCloseButton() {
        return this.popupCloseButton; // Click on the Tabs link
    }

    async clickOnTabsLink() {
        await this.tabsLink.click(); // Click on the Tabs link
    }
    getAllTab() {
        return this.allTabs; // Click on the "What" tab
    }
    async getWhatTabContent() {
        return await this.whatContent.textContent(); // Get the content of the "What" tab
    }

    async clickOnProgressBarLink() {
        await this.progressBarLink.click(); // Click on the Progress Bar link
    }
    async clickOnStartButton() {
        await this.startBttn.click(); // Click on the Start button
    }
    async getProgressBarValue() {
        // Get the value of the progress bar
        return await this.progressBarValue.getAttribute('aria-valuenow'); // Convert the value to an integer
    }

    clickOnDateAndTimePickerLink() {
        return this.dateAndTimePicker; // Click on the Progress Bar link
    }

    getTimePicker() {
        return this.timePicker;
    }


    async clickOnSliderLink() {
        await this.sliderLink.first().click(); // Click on the Slider link
    }
    async getsliderValue() {
        return await this.sliderValue.inputValue(); // Returns the text content of the slider value
    }
    async pressSliderArrowKey(key) {
        await this.slider.press(key); // Press the specified arrow key on the slider
    }

    async getInputBoxMultiBoxText() {
        return await this.inputBoxMultiBox.allTextContents(); // Returns the text content of the multi-value input box
    }
    async getInputText() {
        return await this.inputText.inputValue();; // Returns the locator for the Auto Complete input text
    }

    async getSingleColorResults() {
      await this.autoCompleteOption.click(); // Returns the locator for the single color results
    }
    async enterColorInput(data) {
        //await this.inputText.first().click(); // Click on the input field
        await this.inputText.first().fill(data); // Fill the multi-color input field
        // await this.inputText.first().press('Enter'); // Press Enter to select the option
    }

    async clickOnAutoCompleteLink() {
        await this.autocompleteLink.click(); // Click on the Auto Complete link
    }
    async getAutoCompleteDropdown() {
        return await this.autoCompleteDropdown.textContent(); // Returns the locator for the Auto Complete dropdown
    }
    async clickOnWidgetsLink() {
        await this.widgetsLink.click(); // Click on the Widgets link    
    }
    async clickOnAccordionLink() {
        await this.accordionLink.click(); // Click on the Accordion link
    }
    getFirstAccordionHeader() {
        return this.accordionFirstHeader; // Click on the first accordion header

    }
    async getFirstAccordionContent() {
        return this.accordianFirstContent.textContent(); // Get the content of the first accordion section
    }
    async clickOnSecondAccordionSection() {
        await this.accordionSecondSection.click(); // Click on the second accordion section
    }
    getSecondAccordionContent() {
        return this.accordionSecondSectionContent; // Get the content of the second accordion section
    }
    async setDateOfBirth(date, month, year) {
        console.log(`Setting date of birth: ${date}-${month}-${year}`);


        // Select the month
        await this.dateMonth.selectOption(month);

        // Select the year
        await this.dateYear.selectOption(year);
        await this.date.filter({ hasText: date }).first().click();
        // await this.date.getByText(date).click();
        //await this.date.selectOption.getByText(date)); // Select the date
        console.log(`Date of birth set to: ${date}-${month}-${year}`);
    }
    async clickOnDatePickerLink() {
        await this.datePickerLink.click(); // Click on the Date Picker link
    }
    async clickOnDateLink() {
        await this.dateInput.click(); // Click on the Widgets link
    }
    async getSelectedDate() {
        return await this.dateInput.inputValue(); // Get the selected date from the date picker
    }

}