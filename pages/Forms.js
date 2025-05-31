export  class FormPage {



    constructor(page){

this.page=page;
this.form=page.locator("//div[@class=\"card-body\"]//h5[text()='Forms']"); // gives all form controls on page
this.practiceForm=page.locator("text=Practice Form"); // gives all form controls on page
this.firstName=page.locator("#firstName"); // gives first name input field
this.lastName=page.locator("#lastName"); // gives last name input field
this.userEmail=page.locator("#userEmail"); // gives user name input field
this.userNumber=page.locator("#userNumber");
this .maleGender=page.locator("label[for='gender-radio-1']");
//this .femaleGender=page.locator("input#gender-radio-2");
this.femaleGender = page.locator("label[for='gender-radio-2']"); 
this .otherGender=page.locator("label[for='gender-radio-3']");
this.dateOfBith=page.locator("#dateOfBirthInput");
this.subjects=page.locator("#subjectsInput"); // gives subjects input field
this.subjectDropDown=page.locator("#react-select-2-option-0"); // gives subjects dropdown
this.monthDropdown = page.locator("select[class='react-datepicker__month-select']");
this.yearDropdown = page.locator("select[class='react-datepicker__year-select']");
this.date=page.locator(".react-datepicker__day"); // gives date of birth input field
this.sportHobbie=page.locator("text=Sports");
this.readingHobbie=page.locator("//label[text()='Reading']");
this.musicHobbie=page.locator("//label[text()='Music']");
this.currentAddress=page.locator("#currentAddress"); // gives current address input field
this.stateDropDown=page.locator(".css-1hwfws3")
this.stateOptions=page.locator(".css-11unzgr div");
this.uplaodPicture=page.locator("#uploadPicture"); // gives upload picture input field
this.submitButton=page.locator("button#submit"); // gives submit button
this. thankYouTitle=page.locator("#example-modal-sizes-title-lg")
this. cellTexts=page.locator("tr td");

}
async setSubjects(data){
 await this.subjects.fill(data); 
 await this.subjectDropDown.click(); // Click on the subjects dropdown to open it
 console.log(`Selected Subject: ${data}`);
}

async getThankYouTitle(){
return await this.thankYouTitle.textContent();
 

}

async getCellValue(value){
    console.log(`Searching for value: ${value} in the table cells`);
    const count=await this. cellTexts.count(); // Get the count of all cells in the table
    //allTextContents() fetches all cell texts at once in a single Playwright operation.
    const cellTexts = await this.cellTexts.allTextContents();
 for (let i = 0; i < count; i++) {
    
    // Get the text content of the current cell
    if(value === cellTexts[i]) { // Check if the cell text matches the value
        console.log(`Found value "${value}" in cell ${i + 1}`); // Log the found value and cell index
        return cellTexts[i] // Return the next cell's text content
 }
}
}
async setFirstName(firstName){
    console.log('Setting first name: ' + firstName);
    await this.firstName.fill(firstName); // Fill the first name input field
    return this.firstName.inputValue(); // Return the text content of the first name input field
}
async setUploadPicture(filepath){

await this.uplaodPicture.setInputFiles(filepath); // Upload a picture file


}
async setLastName(lastname)
{

    console.log('Setting last name: ' + lastname);
    await this.lastName.fill(lastname); // Fill the last name input field
    return this.lastName.inputValue() // Return the text content of the last name input field
}
async setUserEmail(email){      
    console.log('Setting user email: ' + email);
    await this.userEmail.fill(email); // Fill the user email input field
}
// async setGender(gender){
//     if(gender=='Female'){
//         await this.femaleGender.click();
// console.log(`Gender is selected ${this.femaleGender.getAttribute('value')}`);
//     }
//     else if(gender=='Male'){
//         await this.maleGender.click();
// console.log(`Gender is selected ${this.maleGender.getAttribute('value')}`);
//     }
//     else if(gender=='Other'){
//         await this.otherGender.click();
// console.log(`Gender is selected ${this.otherGender.getAttribute('value')}`);
//     }

// }

async setNumber(number){
    console.log('Setting user number: ' + number);
    await this.userNumber.fill(number); // Fill the user number input field
}

async setGender(gender){
    const genderMap = {
        'Male': this.maleGender,
        'Female': this.femaleGender,
        'Other': this.otherGender
    };
    
    const genderLocator = genderMap[gender];
    if (!genderLocator) {
        throw new Error(`Invalid gender option: ${gender}`);
    }
    
    await genderLocator.click();
    console.log(`Gender is selected ${genderLocator.getAttribute('value')}`);
    //     }

}


async setHobbies(hobbie){



    const hoobiesMap = {
        'Sports': this.sportHobbie,
        'Reading': this.readingHobbie,
        'Music': this.musicHobbie
    };
    
    const hobbieLocator = hoobiesMap [hobbie];  //We use square brackets [] in JavaScript to access object properties dynamically
    if (! hobbieLocator) {
        throw new Error(`Invalid gender option: ${ hobbie}`);
    }
    
    await  hobbieLocator.click();
    console.log(`Gender is selected ${ hobbieLocator.getAttribute('value')}`);
    //     }

}

async setCurrentAddress(address){
    console.log('Setting current address: ' + address);
    await this.currentAddress.fill(address); // Fill the current address input field
}

async setState(option){
await this.stateDropDown.nth(1).click(); 
await this.stateOptions.filter({hasText:option}).click();


// Click on the state dropdown to open it
//console.log(`Selected State: ${option}`);
}



async setDateOfBirth(date, month, year) {
    console.log(`Setting date of birth: ${date}-${month}-${year}`);
    
    // Click on the date input to open the date picker
    await this.dateOfBith.click();
    
    // Select the month
    await this.monthDropdown.selectOption(month);
    
    // Select the year
    await this.yearDropdown.selectOption(year);
   await this.date.filter({ hasText: date }).first().click();
   // await this.date.getByText(date).click();
    //await this.date.selectOption.getByText(date)); // Select the date
    console.log(`Date of birth set to: ${date}-${month}-${year}`);
}



async goToApplication(){
    const applicationURL = "https://demoqa.com/";
    console.log('Go to application: ' + applicationURL);
    await this.page.goto(applicationURL);
   
}

async getFormPage(){
   await  this.form.click(); // Click on the Forms link
}

async getFormsPracticePage(){
    await  this.practiceForm.first().click(); // Click on the Forms link
 }
 

 async clickSubmitButton(){
    ///await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click(); // Click on the submit button
    console.log('Submit button clicked');
  
}}