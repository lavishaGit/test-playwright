export class InteractionsPage {
    constructor(page) {
        this.page = page;
        this.interactions = page.locator("//div[@class=\"card-body\"]//h5[text()='Interactions']"); // gives all form controls on page
        this.sortable = page.locator("text=Sortable");
        this.accordionLink = page.locator("text=Sortable");
        this.navTabs=  page.locator("[role='tablist']");
        this.list= page.locator('#demo-tab-list');
        this.grid= page.locator("#demo-tab-grid");
        this.listPanel=page.locator(".vertical-list-container .list-group-item-action");
        this.gridPanel=page.locator("#demo-tabpane-grid");
        this.selectable = page.locator("text=Selectable");
         this.selectableList= page.locator("#verticalListContainer");
        this.resizable = page.locator("text=Resizable");
          this.resizableBox = page.locator("#resizableBoxWithRestriction")
         this.resizableHandle=  page.locator(".react-resizable-handle-se")
        this.droppable = page.locator('#item-3',{hasText:'Droppable'});////li[@id="item-3"]//span[text()="Droppable"]
        this.acceptBttn = page.locator("#acceptable");
      this.notAcceptBttn = page.locator("#notAcceptable");
        this.droppableBox=page.locator("#droppable");
     this.droppableElement=page.locator(".ui-state-highlight");
        this.tabAccept = page.locator('#droppableExample-tab-accept');
       //   this.tabPropogation=page.locator('(//nav[@role="tablist"]//a)[3]');
  this.tabPropogation=page.locator('a#droppableExample-tab-preventPropogation')  ;
     this.tabRevertable= page.locator('text=Revert Draggable');
    this.dragMeProp=page.locator('#dragBox');
    this.notGreedyOuter=page.locator("#notGreedyDropBox")
    this.notGreedyInner=page.locator("#notGreedyInnerDropBox")
   this.greedyOuter=page.locator("#greedyDropBox")
    this.greedyInner=page.locator("#greedyDropBoxInner")
      this.tabRevertable= page.locator('#droppableExample-tab-revertable');
      //this.adInFrames= page.locator( 'iframe[id*="google_ads_iframe"]');
      this.adFrame=page.frameLocator('iframe[id="google_ads_iframe_/21849154601,22343295815/Ad.Plus-300x250_0"]')
      
        this.adInFrames = page.locator('iframe[id*="google_ads_iframe"]'); // Locator for all ad iframes
       // this.draggable = page.locator("text=Draggable");
        this .body= page.locator("body");
    }

    getAdFrame() {
        return this.adFrame; // Get the ad frame locator
    }
    getAdInFrames() {
        return this.adInFrames.last(); // Get the last iframe element
    }
    getDragMe() {
        return this.dragMeProp;
    }

    getnotGreedyOuter() {
        return this.notGreedyOuter;
    }
    getnotGreedyInner() {
        return this.notGreedyInner;
    }
    getgreedyOuter() {
        return this.greedyOuter;
    }
    getgreedyInner() {
        return this.greedyInner;
    }

    async clickOnTabAccept() {
        await this.tabAccept.click();


    }
    getAcceptButton() {
        return this.acceptBttn;
    }
    getNotAcceptButton() {
        return this.notAcceptBttn;
    }
    getDroppable() {
        return this.droppableBox;
    }
    async clickOnTabPropogation() {
        // await page.evaluate(() => {
        //     document.querySelector(this.tabPropogation)?.click();
        //   });
     await this.tabPropogation.click(); // Click on the Propagation tab
    }
    async clickOnTabRevertable() {
        await this.tabRevertable.click();
    }
async clickAcceptableElement() {
      await  this.tabAccept.click(); // Get the Acceptable element
    }

    getBody() {
        return this.body;
    }
    async clickOnResizableLink() {
        await this.resizable.click(); // Click on the Resizable link
    }
getResizableBox() { 
        return  this.resizableBox; // Click on the Resizable link
    }
 getResizableHandle() {
     return  this.resizableHandle.first(); // Click on the Resizable link
    }
  async   clickOnDroppableLink() {
       await this.droppable.click(); // Click on the Droppable link
    }
    async clickOnSelectableLink() {
        await this.selectable.first().click(); // Click on the Selectable link
    }
   getSelectlistItems() {
     return  this.selectableList(); // Click on the Resizable link
    }

    async clickOnInteractions() {
        await this.interactions.click(); // Click on the Interactions link
    }
async clickOnSortableLink() {
    await this.sortable.first().click(); // Click on the Sortable link
}

getallNavTabs() {
    return this.navTabs;
}

getlistTab() {
    return this.list;

}
getgridTab() {
    return this.grid;
}
getlistItems() {
    return this.listPanel;
}
getlistItemsText() {
    return this.listPanel.allTextContents();
}
// // utils/eventLogger.js
//  setupEventLogScript() {
//   //  let eventLog = [];
//   window.eventLog = []; // ✅ make it globally accessible
//     document.querySelector('#dragBox')?.addEventListener('dragenter', () => {
// eventLog.push('outer-dragenter');
//     });
//     document.querySelector('[data-testid="inner-droppable"]')?.addEventListener('dragenter', () => {
//  eventLog.push('inner-dragenter'roperty 'eventLog' does not exist);
//     });
//   }


}