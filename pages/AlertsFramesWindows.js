export class AlertsFramesWindowsPage {
    constructor(page) {
        this.page = page;
        //h5[text()='Alerts, Frame & Windows']
        this.alertsFrameWindowLinks = page.locator("text=Alerts, Frame & Windows");
        this.browserWindowLink = page.locator("text=Browser Windows");
        this.newTab = page.locator("#tabButton");
        this.newWindow= page.locator("#windowButton");
        this.newWindowMessage = page.locator("#messageWindowButton");
        this.framesLink = page.locator("li span:has-text('Frames')");
         this.framelocator=page.frameLocator("#frame1"); // used Locator for the frame 
         // or
//const frameLocator = page.frameLocator('iframe[src="/sample"]');
  this.frame2locator=page.frameLocator("#frame2");
//this.frameHeading= page.locator("h1#sampleHeading"); // Locator for the frame heading    in correct way
this.frameHeadingSelector = "h1#sampleHeading"; // just a string
    }


    async getFrame2Locator() {
        return this.frame2locator.first(); // Returns the second frame locator
    }
    async getFrame2Heading() {
        return this.frame2locator.locator(this.frameHeadingSelector).last(); // Returns the second frame heading locator}
    }
    async getFrameLocator() {
        return this.framelocator.first(); // Returns the frame locator
    }
        async getFrameHeading() {
        return this.framelocator.locator(this.frameHeadingSelector).first(); // Returns the frame heading locator
        }
    async clickOnFramesLink() {
        await this.framesLink.first().click();
    }//
    async clickOnAlertsFramesWindows() {
        await this.alertsFrameWindowLinks.click();
    }

    async clickOnBrowserWindow() {
        await this.browserWindowLink.click();
    }

    async clickOnNewTab() {
        await this.newTab.click();
    }

    async clickOnNewWindow() {
        await this.newWindow.click();
    }

    async clickOnNewWindowMessage() {
        await this.newWindowMessage.click();
    }
    async goToApplication() {
        const applicationURL = "https://demoqa.com/";
        console.log('Go to application: ' + applicationURL);
        await this.page.goto(applicationURL);
    }
    async getPagetitle(){
        return await this.page.title(); // Get the page title
    }
}