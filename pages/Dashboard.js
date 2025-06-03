export class DashboardPage{

    constructor(page){
    
    this.page=page;
    this .allLinks=page.locator("a");  //gives all links on page
    this.cards=page.locator(".top-card")// gives all cards on page
  
    this.cardBody=page.locator(".card-body h5")  // gives all card bodies on page
    this.icons=page.locator(".avatar");  // gives all icons on page 
    }
    
    async getAlllinksSize()
    {
        return  await this.allLinks.count();   //this.allLinks.count() returns a Promise
    }
    async goToApplication(){
        const applicationURL = "https://demoqa.com/";
        console.log('Go to application: ' + applicationURL);
        await this.page.goto(applicationURL);
    }
    
    async getAllLinksContent()
    {
        //for(let i of await this.allLinks.count()){   //You cannot use for...of on a number or a Promise directly.
        const linkCount = await this.allLinks.count();
        const linksText = [];
    
        for (let i = 0; i < linkCount; i++) {
        //  const href = await this.allLinks.nth(i).getAttribute("href");    wrong way  ITS TypeError: Cannot read properties of null (reading 'isVisible')
        const linkLocator = this.allLinks.nth(i);         // Get the locator first 
    const href = await linkLocator.getAttribute("href"); // Get href
    const IsDisplayed = await linkLocator.isVisible();   // Check visibility

          linksText.push({href, IsDisplayed});//[ { href: "/home", isDisplayed: true }, { href: "/contact", isDisplayed: false }, ]
        }
    
        return linksText;
    
    
        }
        
        async getIcons() {
            const iconCount = await this.icons.count();
            const iconElements = [];
        
            for (let i = 0; i < iconCount; i++) {
                iconElements.push(this.icons.nth(i)); // Save the locator itself
            }
        
            return iconElements;
        }
    

        async getCards() {
            const iconCount = await this.cards.count();
            const cardsElements = [];
        
            for (let i = 0; i < iconCount; i++) {
               cardsElements.push(this.cards.nth(i)); // Save the locator itself
            }
        
            return cardsElements;
        }
    
   async  getCardsText() {
    const textsCount = await this.cardBody.count();
      
            let textContents=[];
            for (let i = 0; i < textsCount; i++) {
                const text = await this.cardBody.nth(i).textContent(); // Get text content of each card
                if (text === null) {
                    console.warn(`Text content at index ${i} is null`);
                    continue; // Skip if text is null
                }
        textContents.push(text);

      }
      return textContents;

}
}

    //module.exports = {DashboardPage};
    
    