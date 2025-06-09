import {test, expect} from '@playwright/test';
import {InteractionsPage} from '../pages/Interactions';
let interactionsPage = null;
// ✅ Helper function defined properly
async function goToApplicationURL(page) {
 const  applicationURL=  await page.goto("https://demoqa.com/"); // Navigate to the application URL
    console.log('Navigated to application: ' + applicationURL);
  }
test.beforeEach(async ({page}) => {
    interactionsPage = new InteractionsPage(page);
    await goToApplicationURL(page);
    await interactionsPage.clickOnInteractions();
})

test('verifySortable', async ({page}) => {
    await interactionsPage.clickOnSortableLink();
    await expect(page).toHaveURL(/.*sortable/);
    //Verify listtab is  default active
    await expect (interactionsPage.getlistTab()).toHaveClass(/active/);
    const initialOrder = await interactionsPage.getlistItemsText();
    console.log('Initial Order:', initialOrder);
  const listItems=  await interactionsPage.getlistItems() ;
 const item2= listItems.nth(2);
 const item4= listItems.nth(4);
    // Drag the first item to the position of the fifth item
    await item4.dragTo(item2);
    await page.waitForTimeout(3000);
    const newOrder = await interactionsPage.getlistItemsText();
    console.log('New Order:', newOrder);
    console.log(newOrder.indexOf(item4));
    expect(initialOrder).not.toEqual(newOrder); // Verify the order has changed
  // expect (newOrder.indexOf(item4)).toBe(3);

})
test('verifySelectable', async ({page}) => {   
    await interactionsPage.clickOnSelectableLink();
    await expect(page).toHaveURL(/.*selectable/);
    const listItems=  await interactionsPage.getlistItems() ;
    const item2= listItems.nth(1);
    const item4= listItems.nth(3);
    await item2.click();
    await expect(item2).toHaveClass(/active/);
    await item4.click();
    await expect(item4).toHaveClass(/active/);
    await item2.click();
    await item4.click();
    await expect(item2).not.toHaveClass(/active/);
    await expect(item4).not.toHaveClass(/active/);

})
test.only('verifyResizable', async ({page}) => {

    await interactionsPage.clickOnResizableLink();
    await expect(page).toHaveURL(/.*resizable/);
  const box=  await interactionsPage.getResizableBox().boundingBox();
  console.log(`Resizable box weight and height currentsv is ${box.width} and ${box.height}`);
  await interactionsPage.getResizableBox().screenshot({path:'beforeResize.png'});
// Bring the handle above ads or overlays
// await interactionsPage.getResizableHande().evaluate(el => {
//     el.scrollIntoView({ block: 'center' });
//     el.style.zIndex = '9999';
//     el.style.position = 'relative';
//   });
const handle= await interactionsPage.getResizableHandle()

  await handle.dragTo(interactionsPage.getBody(), { SourcePosition: { x: box.x + 150, y: box.y + 150,force: true  }});
    await page.waitForTimeout(5000);
  const upadtedbox=  await interactionsPage.getResizableBox().boundingBox();
  await interactionsPage.getResizableBox().screenshot({path:'afterResize.png'});
  console.log(`Resizable box weight and height currentsv is ${upadtedbox.width} and ${upadtedbox.height}`);
expect (upadtedbox.width).toBeGreaterThan(box.width);
 expect (upadtedbox.height).toBeGreaterThan(box.height);

})

// not working :test.only('verifyResizable', async ({page}) => {

//     await interactionsPage.clickOnResizableLink();
//     await expect(page).toHaveURL(/.*resizable/);
//   const box=  await interactionsPage.getResizableBox().boundingBox();
//   console.log(`Resizable box weight and height currentsv is ${box.width} and ${box.height}`);
//   await interactionsPage.getResizableBox().screenshot({path:'beforeResize.png'});
// // Bring the handle above ads or overlays
// // await interactionsPage.getResizableHande().evaluate(el => {
// //     el.scrollIntoView({ block: 'center' });
// //     el.style.zIndex = '9999';
// //     el.style.position = 'relative';
// //   });
  
//   // Dr
//  const handle= await interactionsPage.getResizableHandle()
//  // Move mouse to handle location
//  await page.mouse.move(
//     box.x + box.width / 2,
//     box.y + box.height / 2
//   );

//   // Press mouse button
//   await page.mouse.down();
//   await page.waitForTimeout(1000);
//   // Drag the mouse to simulate resize (e.g., 100px right and 50px down)
//   await page.mouse.move(
//     box.x +box.width / 2 + 200,
//     box.y + box.height / 2 + 50,
  
//   );

//   // Release mouse button
//   await page.mouse.up();
//     // Wait a little for UI update
//     await page.waitForTimeout(1000);
// //  await handle.dragTo(handle, { targetPosition: { x: box.x + 50, y: box.y + 50,force: true  }});
//   const upadtedbox=  await interactionsPage.getResizableBox().boundingBox();
//   await interactionsPage.getResizableBox().screenshot({path:'afterResize.png'});
//   console.log(`Resizable box weight and height currentsv is ${upadtedbox.width} and ${upadtedbox.height}`);
// // expect (upadtedbox.width).toBeGreaterThan(box.width);
//  // expect (upadtedbox.height).toBeGreaterThan(box.height);
//    // await interactionsPage.ResizableHandle.dragTo(interactionsPage.ResizableHandle, { targetPosition: { x: 200, y: 200 }});

// })