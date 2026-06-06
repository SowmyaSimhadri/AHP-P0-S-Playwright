import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { Page } from '@playwright/test';
import { accounts } from '../tests for Org and Edu , MSA accounts/testData';


type Notebook ={
    name: string;
    lastModified?: string;
  };

export class HomePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
 
  profileIcon = '[aria-label="Account manager for +${profileName}"]'; // adjust after inspect
  accountName = '[data-testid="account-email"]'; 
  header1 = '.fui-LargeTitle'// adjust after inspect
  header2 = '.fui-Subtitle2'// adjust after inspect
  recenticon = '[aria-label = "Recent"]';
  favoritesicon = '[aria-label = "Favorites"]';
  iframe2Selector = '#FileBrowserIFrame';
  iframeSelector = '#WebApplicationFrame';
  openexistingnotebookSelector = "(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]";
  createNewButton = "//button[text() ='Create new notebook']/span";
  notebooklocator = '[class*= "nameCellTop"]';
  notebookicons ='.nameCellIcon_991e267b';
  recentnotebookcontainer ='#recentListContainer';
  listcontent ='#list-content-id'
  providefeedback = '[aria-label="Provide feedback"]';
  M365notebooklocator ='[class = "EdgeworthItemControl-module__title-text__VvfHp"]';

 
  async getLoggedInAccount(profileName: string, accType?: string): Promise<boolean> {
      
      //await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(9000); // ⏳ Wait for potential UI updates
      //const profilepic = '#mectrl_headerPicture';
      //await this.page.waitForSelector(profilepic, { timeout: 60000 });
      //await this.page.locator(profilepic).click();
      const profilebutton = (this.page.locator('[aria-label="Account manager for ' + profileName + '"]')).or(this.page.locator(`[aria-label="Account Manager Button"]`)).last();
      if (accType === 'MSA') {
        await profilebutton.waitFor({ state: 'visible', timeout: 60000 });
        await profilebutton.scrollIntoViewIfNeeded();
        await profilebutton.click();
        } 
        else { 
        await expect(async () => {
          await profilebutton.click();
          await expect(this.page.locator(`div[aria-label="${profileName}"]`)).toBeVisible();
        }).toPass({ timeout: 60000});
        }
      await this.page.waitForSelector(`div[aria-label="${profileName}"]`, { timeout: 60000 });
      const accountEmail = await this.page.locator(`div[aria-label="${profileName}"]`).isVisible();
      return accountEmail;
    
  }

//   async getLoggedInAccount(profileName: string,accType?: string): Promise<boolean> {
 
//     const accountBtn = this.page.locator(`[aria-label="Account manager for ${profileName}"]');
 
//     await this.page.waitForTimeout(2000);
 
//     return await this.page
//         .locator(`div[aria-label="${profileName}"]`)
//         .isVisible()
//         .catch(() => false);
// }
 

  async getBuildVersion(): Promise<string> {
    const f2 = this.page.frameLocator(this.iframeSelector);
    await f2.locator('#FileMenuLauncherContainer').click();
    await f2.locator('.ms-Button-label',{hasText:"About"}).click();
    const versionText = await f2.locator('#TextInfoSectionValue-1').inputValue();
    return versionText;
  }

  async openExistingNotebook() {
        if (this.page.isClosed()) throw new Error('Page is closed before openExistingNotebook');
        console.log('openExistingNotebook: start');
        await this.page.waitForSelector(this.iframe2Selector, { timeout: 60000 });
        //const handle = await this.page.$(this.iframe2Selector);
        //const frame = handle ? await handle.contentFrame() : null;
        let nbname = '';
        const fl = this.page.frameLocator(this.iframe2Selector);
        if (!fl) throw new Error(`Frame ${this.iframe2Selector} not available`);
        try {
            // Wait for the notebook list to load
            console.log('Waiting for notebook list to load...');
            await fl.locator(this.openexistingnotebookSelector).waitFor({ state: 'visible', timeout: 30000 });
            console.log('✓ Notebook list loaded');
            const nbname = await fl.locator(this.openexistingnotebookSelector).innerText();
            
            // use clickWithRetries for stability
            console.log('Attempting to click on existing notebook...');
            await expect(fl.locator("(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]")).toBeVisible({ timeout: 60000 });
            console.log(`Clicked notebook: ${nbname}`);

            await this.clickWithRetries(fl, "(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]");
            console.log('✓ Clicked on existing notebook');
            
            await this.page.waitForTimeout(500);           

        } catch (err) {
            console.error('openExistingNotebook failed:', err);
            throw err;
        }
        const f2 = this.page.frameLocator(this.iframeSelector);
        const notebookname = await f2.locator('[data-unique-id="DocumentTitleContent"]').innerText();
        console.log(`Opened notebook: ${notebookname}`);
        if (nbname.trim() === notebookname.trim()) {
            console.log('✓ Notebook opened successfully');
        }

        console.log('openExistingNotebook: done');
    }

    async createNewNotebook() {
        console.log('createNewNotebook: start');
        // trigger UI that opens/attaches the iframe
        await this.page.locator(this.createNewButton).click().catch(() => {
            console.warn('createNewButton click failed, trying fallback testid click');
            return this.page.getByTestId('0300').click().catch(() => {});
        });
        const f2 = this.page.frameLocator(this.iframeSelector);
        await this.page.waitForSelector(this.iframeSelector, { timeout: 60000 });
        const nbcreated = await f2.locator('[data-unique-id="DocumentTitleContent"]').innerText();
        console.log(`Created notebook: ${nbcreated}`);
        }


    async waitForNotebooksToLoad() {
        const fl = this.page.frameLocator(this.iframe2Selector);
        const notebookLocator = fl.locator('button[class*="nameCellTop"]');

    // 
    try {    
    await expect.poll(async() => {
      return await notebookLocator.count();
    }, {
      timeout: 60000,
      message: 'Notebooks did not load within timeout'
    }).toBeGreaterThan(0);
  } catch (err) {
    console.log('waitForNotebooksToLoad failed, Reloading page and retrying...', err);
    await this.page.reload();
    await this.waitForNotebooksToLoad();
  }
}


    async waitForRecentToLoad() {
        const fl = this.page.frameLocator(this.iframe2Selector);
        const RecentLocator = fl.getByRole('tab', { name: 'Recent' });

    // 
    try {    
    await expect.poll(async() => {
      return await RecentLocator.count();
    }, {
      timeout: 60000,
      message: 'Recent items did not load within timeout'
    }).toBeGreaterThan(0);
  } catch (err) {
    console.log('waitForRecentToLoad failed, Reloading page and retrying...', err);
    await this.page.reload();
    await this.waitForRecentToLoad();
  }
}


    async getTopNotebooks(
  source: 'onenote' | 'm365',
  limit = 6
): Promise<Notebook[]> {
 
  let notebookLocator;
 
  if (source === 'onenote') {

    //await this.page.reload();
    await this.page.waitForTimeout(30000);
 
    const fl = this.page.frameLocator(this.iframe2Selector);
 
    await fl
      .locator('button[class*="nameCellTop"]')
      .first()
      .waitFor({ timeout: 30000 });
 
    notebookLocator = fl.locator('button[class*="nameCellTop"]');
 
  } else {

    //await this.page.reload();
    //await this.page.waitForTimeout(30000);
 
    // ✅ wait for M365 notebooks
    await this.page.waitForSelector(
      '[class*="title-text"]',
      { timeout: 30000 }
    );
 
    notebookLocator = this.page.locator('[class*="title-text"]');
 
    // 🔥 force lazy loading
    const countBefore = await notebookLocator.count();
 
    if (countBefore < limit) {
 
  for (let i = 0; i < 5; i++) {
 
    // 🔥 Scroll whole page instead of locator
    await this.page.mouse.wheel(0, 500);
 
    await this.page.waitForTimeout(2000);
 
    const currentCount = await notebookLocator.count();
 
    console.log(`Scrolled count: ${currentCount}`);
 
    if (currentCount >= limit) {
      break;
    }
  }
}
  }
 
  // 🔥 COMMON extraction logic
  const list: Notebook[] = await notebookLocator.evaluateAll(
    (elements, limit) => {
 
      return elements.slice(0, limit).map(el => {
 
        // 🔹 NAME extraction
        const name =
          el.getAttribute('title') ||
          el.getAttribute('aria-label') ||
          el.textContent ||
          '';
 
        // 🔹 LAST MODIFIED extraction
        let time = '';
 
        const row = el.closest('[role="gridcell"]');
 
        // Option 1
        if (row) {
 
          const timeEl = row.querySelector(
            '[data-automationid="field-openedDate"]'
          );
 
          if (timeEl) {
            time = timeEl.textContent || '';
          }
        }
 
        // Option 2
        if (!time) {
 
          const timeEl = el.querySelector(
            '[class*="document-column__date"]'
          );
 
          if (timeEl) {
            time = timeEl.textContent || '';
          }
        }
 
        return {
          name: name.trim(),
          lastModified: time.trim()
        };
      });
 
    },
    limit
  );
 
  console.log(`✅ Notebook count (${source}):`, list.length);
 
  return list;
}


    async VerifyUIElements(profileName: string) {
        const profilebutton = this.page.locator(`[aria-label="Account manager for ${profileName}"]`).or(this.page.locator(`[aria-label="Account Manager Button"]`));
        await expect(profilebutton).toBeVisible();
        await expect(this.page.locator('h1:has-text("Welcome")')).toBeVisible();
        await expect(this.page.locator('h2:has-text("My notebooks")')).toBeVisible();
        await expect(this.page.locator(this.createNewButton)).toBeVisible();
        const fl = this.page.frameLocator(this.iframe2Selector);
        await fl.getByRole('tab', { name: 'Recent' }).waitFor({ timeout: 30000 });
        await expect(fl.getByRole('tab', { name: 'Recent' })).toBeVisible();
        //await expect(this.page.locator('span:has-text("Recent")')).toBeVisible();
        await expect.soft(fl.getByRole('tab', { name: 'Favorites' })).toBeVisible();
        await expect(this.page.locator('a:has-text("Show all notebooks")')).toBeVisible();
        await expect(fl.getByPlaceholder("Filter by name or person")).toBeVisible();
        const notebooks = await fl.locator(this.notebooklocator).count();
        expect(notebooks).toBeGreaterThan(0);
        const icons = await fl.locator(this.notebookicons).count();
        expect(icons).toBeGreaterThan(0);
        await expect(fl.locator(this.recentnotebookcontainer)).toBeVisible();
        await expect(fl.locator(this.listcontent)).toBeVisible();
        await expect(fl.locator('span:has-text("Name")')).toBeVisible();
        await expect(fl.locator('span:has-text("Opened")')).toBeVisible();
        await expect(fl.locator('span:has-text("Owner")')).toBeVisible();
        //await expect.soft(fl.locator('span:has-text("Activity")')).toBeVisible();
        const gridCells = fl.locator('[role="gridcell"]');
 
        const count = await gridCells.count();
 
        for (let i = 0; i < count; i++) {
 
           const box = await gridCells.nth(i).boundingBox();
 
           //expect(box).not.toBeNull();
 
           if (box) {
             expect(box.width).toBeGreaterThan(100);
             expect(box.height).toBeGreaterThan(50);
          }
        }
        await this.page.locator(this.providefeedback).scrollIntoViewIfNeeded();
        //await this.page.pause();
        await expect(this.page.locator(this.providefeedback)).toBeVisible();
        await expect(this.page.locator('a:has-text("Install Microsoft 365 apps")')).toBeVisible();
      }

    async VerifyUIElementsforMSA(profileName: string) {
        const profilebutton = this.page.locator(`[aria-label="Account manager for ${profileName}"]`).or(this.page.locator(`[aria-label="Account Manager Button"]`));
        await expect(profilebutton).toBeVisible();
        await expect(this.page.locator('h1:has-text("Welcome")')).toBeVisible();
        await expect(this.page.locator('h2:has-text("My notebooks")')).toBeVisible();
        await expect(this.page.locator(this.createNewButton)).toBeVisible();
        const fl = this.page.frameLocator(this.iframe2Selector);
        try {
        await fl.getByRole('tab', { name: 'Recent' }).waitFor({ timeout: 30000 });
        await expect(fl.getByRole('tab', { name: 'Recent' })).toBeVisible();}
        catch(e) {
            console.log('Recent tab not visible, retrying...', e);
            await this.waitForRecentToLoad();
        }
        //await expect(this.page.locator('span:has-text("Recent")')).toBeVisible();
        //await expect.soft(fl.getByRole('tab', { name: 'Favorites' })).toBeVisible();
        await expect(this.page.locator('a:has-text("Show all notebooks")')).toBeVisible();
        await expect(fl.getByPlaceholder("Filter by name or person")).toBeVisible();
        const notebooks = await fl.locator(this.notebooklocator).count();
        expect(notebooks).toBeGreaterThan(0);
        const icons = await fl.locator(this.notebookicons).count();
        expect(icons).toBeGreaterThan(0);
        await expect(fl.locator(this.recentnotebookcontainer)).toBeVisible();
        await expect(fl.locator(this.listcontent)).toBeVisible();
        await expect(fl.locator('span:has-text("Name")')).toBeVisible();
        await expect(fl.locator('span:has-text("Opened")')).toBeVisible();
        await expect(fl.locator('span:has-text("Owner")')).toBeVisible();
        //await expect.soft(fl.locator('span:has-text("Activity")')).toBeVisible();
        const gridCells = fl.locator('[role="gridcell"]');
 
        const count = await gridCells.count();
 
        for (let i = 0; i < count; i++) {
 
           const box = await gridCells.nth(i).boundingBox();
 
           //expect(box).not.toBeNull();
 
           if (box) {
             expect(box.width).toBeGreaterThan(100);
             expect(box.height).toBeGreaterThan(50);
          }
        }
        await this.page.locator(this.providefeedback).scrollIntoViewIfNeeded();
        //await this.page.pause();
        await expect(this.page.locator(this.providefeedback)).toBeVisible();
        await expect(this.page.locator('a:has-text("Install Microsoft 365 apps")')).toBeVisible();
      }

    async clickWithRetries(frameOrPage : any, selector : any, maxAttempts = 4) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const loc = frameOrPage.locator(selector).first();
                await loc.waitFor({ state: 'visible', timeout: 4000 });
                await loc.scrollIntoViewIfNeeded().catch(() => null);

                // 1) normal click
                try { await loc.click({ timeout: 5000 }); return true; } catch {}

                // 2) force click
                try { await loc.click({ force: true, timeout: 3000 }); return true; } catch {}

                // 3) DOM click via evaluate
                const handle = await loc.elementHandle();
                if (handle) {
                    const clicked = await this.page.evaluate((el) => {
                        try { el.scrollIntoView({block:'center'}); el.click(); return true; } catch { return false; }
                    }, handle).catch(() => false);
                    if (clicked) return true;
                }

                // 4) click by bounding box
                const box = await loc.boundingBox().catch(() => null);
                if (box) {
                    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
                    return true;
                }
            } catch (e) {
                // ignore and retry
            }
            // exponential backoff
            await this.page.waitForTimeout(300 + attempt * 200);
        }
        throw new Error(`clickWithRetries: failed to click "${selector}" after ${maxAttempts} attempts`);
    }
}