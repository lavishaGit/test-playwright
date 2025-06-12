import {test, expect} from '@playwright/test';

import {InteractionsPage} from '../pages/Interactions';
import {convertHexToRGB} from '../utils/commonfunctions'
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';

async function removeGoogleVignetteAd(page) {
    await page.evaluate(() => {
      const adIframe = document.querySelector('iframe[id="google_ads_iframe_/21849154601,22343295815/Ad.Plus-300x250_0"]');
      if (adIframe) {
        adIframe.remove();
      }
    });
  }
let interactionsPage = null;
// ✅ Helper function defined properly
async function goToApplicationURL(page) {
 const  applicationURL=  await page.goto("https://demoqa.com/"); // Navigate to the application URL
    console.log('Navigated to application: ' + applicationURL);
  }
  async function blockAds(page) {
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);
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
test('verifyResizable', async ({page}) => {

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
  // Add the eventLog array before page navigation
 
test('verifyDroppable', async ({page}) => {
    ;
    await interactionsPage.clickOnDroppableLink();
    await expect(page).toHaveURL(/.*droppable/);

    const tabs =await interactionsPage.getallNavTabs().all();
    await Promise.all(   // parallel execution
        tabs.map(async (tab) => {
          const text = await tab.textContent();
          console.log(text);
            await tab.click();
            await page.waitForTimeout(5000);
        })
      );
      page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.dismiss(); // or dialog.accept()
      });
      const rgbColors = convertHexToRGB("#4682b4");
       console.log('RGB Colors:', rgbColors);
       await interactionsPage.clickOnTabAccept();
       await interactionsPage.getAcceptButton().dragTo(interactionsPage.getDroppable().nth(1));
       await page.waitForTimeout(3000);
       await expect(interactionsPage.getDroppable().nth(1)).toHaveText('Dropped!');
      
       const dropBox=   await interactionsPage.getDroppable().nth(1);
                
                 await  expect(dropBox).toHaveCSS("background-color",`rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`) // Assert that the icon color matches the expected RGB color
              

})


test('should prevent propagation when toggle is enabled', async ({ page }) => {
    await blockAds(page);
    // ✅ Block ad requests BEFORE any interaction
  await page.route("**/*", route => {
    const url = route.request().url();
    if (url.includes("google_vignette") || url.includes("googleads.")) {
      route.abort();
      console.warn('Blocked ad:', url);
    } else {
      route.continue();
    }
  }); 
  
//   page.on('framenavigated', async frame => {
//     const url = frame.url();
//     if (url.includes('google_vignette')) {
//       console.warn(`⚠️ Navigated to ad page: ${url}, trying to go back`);
//       try {
//       await page.goBack();
//         await page.waitForLoadState('domcontentloaded');
//       } catch (err) {
//         console.error("⚠️ Failed to go back:", err);
//       }
//     }
//   });
 
  

  // 👉 Now run your test steps OUTSIDE the event listener
  await interactionsPage.clickOnDroppableLink();
 // removeGoogleVignetteAd(page);
//   const adIframe = interactionsPage.getAdInFrames();
await page.waitForTimeout(2000);
//   adIframe.remove(); // or adIframe.remove()

 // Wait for correct tab to reappear in DOM
await page.waitForSelector('//a[@id="droppableExample-tab-accept"]', { state: 'visible' });
await page.evaluate(() => {
    /** @type {HTMLElement | null} */
 const elemnt=   document.querySelector('a#droppableExample-tab-preventPropogation');
 elemnt?.click(); // Click the "Prevent Propagation" tab
  });
  await interactionsPage.clickAcceptableElement()
  await page.waitForTimeout(2000);
 // await page.waitForSelector(interactionsPage.clickOnTabPropogation(), { state: 'visible' });


await expect(await interactionsPage.getDragMe()).toBeVisible();


// await page.evaluate(() => {
//     const dragMeElement = document.querySelector('#dragBox');
//  // Scroll the element into view and bring it to the front
//     if (dragMeElement) {
//         dragMeElement.scrollIntoView({ block: 'center' });
//         dragMeElement.style.zIndex = '9999'; // Bring it to the front
//         dragMeElement.style.position = 'relative'; // Ensure it can be dragged
//     } else {
//         console.error('Drag Me element not found');
//     }
//   });
    // await interactionsPage.getDragMe().scrollIntoViewIfNeeded();

  const box = await interactionsPage.getDragMe().boundingBox();
  const destBox= await interactionsPage.getnotGreedyInner().boundingBox();
 // await box.hover(); .hover() works on locator objects.
 if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y, { steps: 10 });
    await page.mouse.up();
    console.log('Drag and drop completed');
  }
  
//     if (!dragMeBox) {
//         throw new Error("dragMeBox is null. Element might not be visible or attached to DOM.");
//       }
    
  console.log(`Drag Me box position: x=${box.x}, y=${box.y}, width=${box.width}, height=${box.height}`);
  console.log(`Destination box position: x=${destBox.x}, y=${destBox.y}, width=${destBox.width}, height=${destBox.height}`);
//     // Move mouse to destination container

//    const dragElement = await interactionsPage.getDragMe(); 
// const dropTarget = await interactionsPage.getnotGreedyInner();

// await dragElement.hover();
// await page.mouse.down();
// await dropTarget.hover();
// await page.mouse.up();
   // await interactionsPage.getDragMe().dragTo(interactionsPage.getnotGreedyInner(),{ force: true });
    // await page.mouse.move(dragMeBox.x + dragMeBox.width / 2, dragMeBox.y + draeBox.height / 2);
    // await page.mouse.down();
   await page.waitForTimeout(4000);
})


    // const innerBox=await interactionsPage.getnotGreedyInner().boundingBox();
    // if (!innerBox) {
    //     throw new Error("innerBox is null. Element might not be visible or attached to DOM.");
    //   }
    // console.log(`Inner Box position: x=${innerBox.x}, y=${innerBox.y}, width=${innerBox.width}, height=${innerBox.height}`);
    // // Move mouse to inner container
    // await page.mouse.move(innerBox.x + innerBox.width / 2, innerBox.y + innerBox.height / 2);



    //     test('should handle nested drag without prevent propagation', async () => {
//       // Disable prevent propagation
//       await page.click('[data-testid="prevent-propagation-toggle"]');
//       await expect(page.locator('[data-testid="prevent-propagation-toggle"]')).toHaveClass(/inactive/);
      
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();
      
//       // Move to inner container
//       const innerBox = await page.locator('[data-testid="inner-droppable"]').boundingBox();
//       await page.mouse.move(innerBox.x + innerBox.width/2, innerBox.y + innerBox.height/2);
      
//       // Without prevent propagation, both should have visual feedback
//       await expect(page.locator('[data-testid="inner-droppable"]')).toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="outer-droppable"]')).toHaveClass(/drag-over/);
      
//       await page.mouse.up();
//     });
//   });

//     test('should handle drag over outer container only', async () => {
//       // Drag over outer container (not inner)
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();
      
//       // Move to outer container area (avoiding inner)
//       const outerBox = await page.locator('[data-testid="outer-droppable"]').boundingBox();
//       await page.mouse.move(outerBox.x + 50, outerBox.y + 50);
      
//       // Verify only outer container has drag-over class
//       await expect(page.locator('[data-testid="outer-droppable"]')).toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="inner-droppable"]')).not.toHaveClass(/drag-over/);
      
//       await page.mouse.up();
//     });

//     test('should handle drag over inner container', async () => {
//       // Enable prevent propagation
//       await page.click('[data-testid="prevent-propagation-toggle"]');
      
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();
      
//       // Move to inner container
//       const innerBox = await page.locator('[data-testid="inner-droppable"]').boundingBox();
//       await page.mouse.move(innerBox.x + innerBox.width/2, innerBox.y + innerBox.height/2);
      
//       // With prevent propagation, only inner should have drag-over
//       await expect(page.locator('[data-testid="inner-droppable"]')).toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="outer-droppable"]')).not.toHaveClass(/drag-over/);
      
//       await page.mouse.up();
//     });



//   test.describe('Greedy vs Non-Greedy Behavior', () => {
//     test('should test greedy inner droppable behavior', async () => {
//       // Enable greedy mode for inner
//       await page.click('[data-testid="inner-greedy-toggle"]');
//       await expect(page.locator('[data-testid="inner-droppable"]')).toHaveClass(/greedy/);

//       // Track drop events
//       await page.evaluate(() => {
//         window.dropLog = [];
//         document.querySelector('[data-testid="outer-droppable"]').addEventListener('drop', (e) => {
//           window.dropLog.push('outer-drop');
//         });
//         document.querySelector('[data-testid="inner-droppable"]').addEventListener('drop', (e) => {
//           window.dropLog.push('inner-drop');
//           e.stopPropagation(); // Greedy behavior
//         });
//       });

//       // Drop on inner greedy element
//       await page.dragAndDrop(
//         '[data-testid="draggable-item"]',
//         '[data-testid="inner-droppable"]'
//       );

//       // Greedy inner should consume the drop
//       const dropLogs = await page.evaluate(() => window.dropLog);
//       expect(dropLogs).toContain('inner-drop');
//       expect(dropLogs).not.toContain('outer-drop');
//     });

//     test('should test non-greedy behavior allows propagation', async () => {
//       // Disable greedy mode
//       await page.click('[data-testid="inner-greedy-toggle"]');
//       await expect(page.locator('[data-testid="inner-droppable"]')).not.toHaveClass(/greedy/);

//       await page.evaluate(() => {
//         window.dropLog = [];
//         document.querySelector('[data-testid="outer-droppable"]').addEventListener('drop', () => {
//           window.dropLog.push('outer-drop');
//         });
//         document.querySelector('[data-testid="inner-droppable"]').addEventListener('drop', () => {
//           window.dropLog.push('inner-drop');
//           // Non-greedy - don't stop propagation
//         });
//       });

//       await page.dragAndDrop(
//         '[data-testid="draggable-item"]',
//         '[data-testid="inner-droppable"]'
//       );

//       // Both should receive drop events
//       const dropLogs = await page.evaluate(() => window.dropLog);
//       expect(dropLogs).toContain('inner-drop');
//       expect(dropLogs).toContain('outer-drop');
//     });
//   });



//   test.describe('Visual Feedback Testing', () => {
//     test('should verify drag-over visual states', async () => {
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();

//       // Test outer container visual feedback
//       const outerBox = await page.locator('[data-testid="outer-droppable"]').boundingBox();
//       await page.mouse.move(outerBox.x + 50, outerBox.y + 50);
      
//       await expect(page.locator('[data-testid="outer-droppable"]')).toHaveClass(/drag-over/);
      
//       // Move to inner container
//       const innerBox = await page.locator('[data-testid="inner-droppable"]').boundingBox();
//       await page.mouse.move(innerBox.x + innerBox.width/2, innerBox.y + innerBox.height/2);
      
//       await expect(page.locator('[data-testid="inner-droppable"]')).toHaveClass(/drag-over/);
      
//       // Move away and verify cleanup
//       await page.mouse.move(outerBox.x + outerBox.width + 100, outerBox.y);
      
//       await expect(page.locator('[data-testid="outer-droppable"]')).not.toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="inner-droppable"]')).not.toHaveClass(/drag-over/);
      
//       await page.mouse.up();
//     });

//     test('should test dragging item visual feedback', async () => {
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();
      
//       // Verify dragging state
//       await expect(page.locator('[data-testid="draggable-item"]')).toHaveClass(/dragging/);
      
//       await page.mouse.up();
      
//       // Verify state cleanup
//       await expect(page.locator('[data-testid="draggable-item"]')).not.toHaveClass(/dragging/);
//     });
//   });


//     test('should handle drag cancellation (ESC key)', async () => {
//       await page.hover('[data-testid="draggable-item"]');
//       await page.mouse.down();
      
//       // Verify drag started
//       await expect(page.locator('[data-testid="draggable-item"]')).toHaveClass(/dragging/);
      
//       // Cancel with ESC
//       await page.keyboard.press('Escape');
      
//       // Verify drag cancelled
//       await expect(page.locator('[data-testid="draggable-item"]')).not.toHaveClass(/dragging/);
//     });
//   });

//   test.describe('Performance and Timing Tests', () => {
//     test('should handle fast drag operations', async () => {
//       const startTime = Date.now();
      
//       await page.dragAndDrop(
//         '[data-testid="draggable-item"]',
//         '[data-testid="inner-droppable"]',
//         { timeout: 1000 }
//       );
      
//       const endTime = Date.now();
//       const duration = endTime - startTime;
      
//       // Verify operation completed within reasonable time
//       expect(duration).toBeLessThan(5000);
//     });

//     test('should verify event cleanup after operations', async () => {
//       // Perform multiple drag operations
//       for (let i = 0; i < 3; i++) {
//         await page.dragAndDrop(
//           '[data-testid="draggable-item"]',
//           '[data-testid="outer-droppable"]'
//         );
        
//         // Wait a bit between operations
//         await page.waitForTimeout(100);
//       }
      
//       // Verify no lingering visual states
//       await expect(page.locator('[data-testid="outer-droppable"]')).not.toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="inner-droppable"]')).not.toHaveClass(/drag-over/);
//       await expect(page.locator('[data-testid="draggable-item"]')).not.toHaveClass(/dragging/);
//     });
//   });

//   test.describe('Accessibility Testing', () => {
//     test('should support keyboard navigation', async () => {
//       // Focus on draggable item
//       await page.focus('[data-testid="draggable-item"]');
      
//       // Use keyboard to initiate drag (if supported)
//       await page.keyboard.press('Space');
//       await page.keyboard.press('ArrowDown');
//       await page.keyboard.press('ArrowRight');
//       await page.keyboard.press('Space');
      
//       // Verify accessibility attributes
//       await expect(page.locator('[data-testid="draggable-item"]')).toHaveAttribute('draggable', 'true');
//     });

//     test('should have proper ARIA labels', async () => {
//       await expect(page.locator('[data-testid="outer-droppable"]')).toHaveAttribute('role');
//       await expect(page.locator('[data-testid="inner-droppable"]')).toHaveAttribute('role');
//     });
//   });
// });