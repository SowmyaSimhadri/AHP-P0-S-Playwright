import { test, expect, Page, BrowserContext, firefox } from '@playwright/test';
import { chromium } from '@playwright/test';
import { AuthPage } from '../../pages/AuthPage';
import { HomePage } from '../../pages/HomePage';
//import { MSAAccounts } from '../testData';
import { MSAaccounts } from '../testData';
//console.log("MSA Accounts count:", MSAAccounts.length);;
 
console.log("Accounts count:", MSAaccounts.length);

test.skip(({ browserName }) => browserName !== 'firefox', 'Skipping chrome tests in this file');
 
for (const acc of MSAaccounts) {
 
  console.log(`Setting up tests for ${acc.type} account: ${acc.email}`);
 
  test.describe(`Tests for ${acc.email}`, () => {
 
    let page!: Page;
    let context!: BrowserContext;
    let home!: HomePage;
 
    test.beforeAll(async () => {
      /*context = await browser.newContext({ storageState: 'playwright/.auth/msaAuth.json' }); // ✅ FIXED (no const)
      page = await context.newPage();
 
      const auth = new AuthPage(page);
      home = new HomePage(page);
 
      //await page.goto('https://login.microsoftonline.com/logout.srf');
      await page.goto('https://onenote.cloud.microsoft/');
 
      //await auth.login(acc.email, acc.password, acc.type);
      await home.openExistingNotebook();
      const version = await home.getBuildVersion();
      console.log(`Logged in with ${acc.type}: ${acc.email}, Build Version: ${version}`);
 
      await page.goto('https://onenote.cloud.microsoft/');*/
 
      context = await firefox.launchPersistentContext(
      'C:\\playwright-MSA-Firefox-profile',
       {
          headless: true,
          channel: 'firefox',
          args: ['--start-maximized']
        }
      );
 
     page = context.pages()[0] || await context.newPage();

     home = new HomePage(page);
 
     await page.goto('https://onenote.cloud.microsoft/');
 
 
      await page.waitForLoadState('networkidle');
    });
 
    test('TC1 - Verify logged in account', async () => {
      const isLoggedIn = await home.getLoggedInAccount(acc.profile || acc.email,acc.type);
      expect(isLoggedIn).toBe(true);
 
 
      console.log(`✅ Logged in with ${acc.type}: ${acc.email}`);
    });
 
    test('TC2 - Compare top 5 notebooks between OneNote and M365', async ({ }) => {
 
      const home = new HomePage(page);
      const auth = new AuthPage(page);
 
      

      //await page.waitForLoadState('networkidle');
      await page.goto('https://onenote.cloud.microsoft/');
      await home.waitForNotebooksToLoad(); // ⏳ Wait for notebooks to load (with retries)

      const oneNoteList = await home.getTopNotebooks('onenote',5);
 
     // 🔹 M365
      await page.goto('https://m365.cloud.microsoft/');
      //await auth.M365login(acc.email, acc.password, acc.type);
      //await page.reload();
      //await page.waitForTimeout(30000);
 
      //await page.waitForLoadState('networkidle');
      //await page.locator('[data-testid="expand-button"]').click();
      //await page.locator('[aria-haspopup="menu"]').filter({hasText:"Apps"}).click();
      //await page.locator('[class = "fui-MenuItem__content r1ls86vo"]').filter({hasText:"OneNote"}).click();
      await page.waitForLoadState('networkidle');

      //await expect(page.getByText('All chats')).toBeVisible({ timeout: 60000 });
      
      /*const appLauncher = await page.getByRole('button', {name: 'App Launcher'});
      
      await page.waitForLoadState('networkidle');
      await expect(appLauncher).toBeVisible({ timeout: 60000 }); // ⏳ Wait for potential UI updates
      await appLauncher.click();
      //await appLauncher.click();
      //await page.waitForTimeout(5000);
      //await home.clickWithRetries(appLauncher, 5);
      /*await Promise.all([
        page.waitForURL(/onenote/i, { timeout: 60000 }),
        page.locator('[class = "fui-MenuItem__content r1ls86vo"]').filter({hasText:"OneNote"}).click()
      ]);*/
      
      
      console.log("Navigated to:", page.url());
      //await page.reload();
      // 🔥 Handle NEW TAB
      const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#OneNoteOnline').click()]);
 
      await newPage.waitForLoadState();
      await newPage.reload();
 
      // 👉 VERY IMPORTANT
      const homeM365 = new HomePage(newPage);
 
      // Now use newPage (NOT old page)
      //await page.waitForLoadState('networkidle');
      //await page.reload();
      //await page.waitForTimeout(30000);
      //await page.waitForURL(/onenote/i, { timeout: 60000 });
      await page.waitForLoadState('domcontentloaded');
      //await page.waitForTimeout(10000); // ⏳ Wait for content to load
      const m365List = await homeM365.getTopNotebooks('onenote', 5);

      await newPage.close(); // ✅ Close the new tab after getting the data 

      // 🔹 OneNote
      //await page.goto('https://onenote.cloud.microsoft/');
      //await home.waitForNotebooksToLoad(); // ⏳ Wait for notebooks to load (with retries)
      //await page.waitForTimeout(30000);
      
 
     // 🔥 Validate count
      expect(m365List.length).toBe(oneNoteList.length);
 
     // 🔥 Validate name + order
    //   for (let i = 0; i < oneNoteList.length; i++) {
    //     expect.soft(oneNoteList[i].name).toBe(m365List[i].name);
 
    //     // Optional timestamp check
    //     expect.soft(m365List[i].lastModified).toBe(oneNoteList[i].lastModified);
    // }  
    // 🔥 Convert M365 list to map
     for (const oneNoteNotebook of oneNoteList) {
 
  const matchFound = m365List.some(m365Notebook =>
 
    m365Notebook.name.trim() === oneNoteNotebook.name.trim() &&
 
    (m365Notebook.lastModified?.trim() ?? '') ===
    (oneNoteNotebook.lastModified?.trim() ?? '')
  );
 
  expect.soft(
    matchFound,
    `Notebook mismatch: ${oneNoteNotebook.name}`
  ).toBeTruthy();
}
 
    });
 
    test('TC3 - Auth Functionality', async () => {
      await page.goto('https://onenote.cloud.microsoft/');
      await expect(page).toHaveURL(/onenote/);
 
      await home.openExistingNotebook();
      //await page.goBack();
      await page.goto('https://onenote.cloud.microsoft/')
      await home.createNewNotebook();
     
    });
 
    test('TC4 - UI Elements Verification', async () => {
      await page.goto('https://onenote.cloud.microsoft/');
      await expect(page).toHaveURL(/onenote/);
 
      await home.VerifyUIElementsforMSA(acc.profile || acc.email);
     
    });
 
    // test.afterAll(async () => {
    //   await context.close(); // ✅ better than page.close()
    // });
 
  });
 
}