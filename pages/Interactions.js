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
        this.droppable = page.locator("text=Droppable");
        this.draggable = page.locator("text=Draggable");
        this .body= page.locator("body");
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
    async clickOnDroppableLink() {
        await this.droppable; // Click on the Droppable link
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

}