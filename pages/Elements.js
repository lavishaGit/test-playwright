export default class ElementsPage {



    constructor(page){

this.page=page;

this.elementPage=page.locator("//div[@class=\"card-body\"]//h5[text()='Elements']");
this.brokenLinksPage=page.locator("#item-6");
this.validImage=page.locator("//div[@class=\"col-12 mt-4 col-md-6\"]//img[@src=\"/images/Toolsqa.jpg\"]")
this.brokenImage=page.locator("//div[@class=\"col-12 mt-4 col-md-6\"]//img[@src=\"/images/Toolsqa_1.jpg\"]")
this.links=page.locator("//div[@class='col-12 mt-4 col-md-6']//a");
    }

    async getAllLinks() {
        return await this.links;
    }
async clickOnElementPage(){
    await this.elementPage.click();
}

async clickOnBrokenLinkPage(){
    await this.brokenLinksPage.filter({hasText:'Broken Links - Images'}).click();
}

async getValidImage(){
    return await this.validImage;
}

async getBrokenImage(){
    return await this.brokenImage;

}
async goToApplication(){
    const applicationURL = "https://demoqa.com/";
    console.log('Go to application: ' + applicationURL);
    await this.page.goto(applicationURL);
   
}
}