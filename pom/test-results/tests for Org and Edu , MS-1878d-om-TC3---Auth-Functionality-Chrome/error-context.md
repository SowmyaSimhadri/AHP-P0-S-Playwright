# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests for Org and Edu , MSA accounts\accountTests.spec.ts >> Tests for s-deepthi@edunotebook.onmicrosoft.com >> TC3 - Auth Functionality
- Location: pom\tests for Org and Edu , MSA accounts\accountTests.spec.ts:151:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#FileBrowserIFrame').contentFrame().locator('xpath=(//button[@class = \'nameCellTop_991e267b nameCellTopContrast\'])[1]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e6]:
    - button "App launcher" [ref=e9] [cursor=pointer]: 
    - generic [ref=e15]:
      - generic [ref=e18]:
        - img "App brand icon" [ref=e20]
        - generic [ref=e21]: OneNote
      - generic [ref=e25]:
        - button "Settings" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: 
        - button "Help" [ref=e32] [cursor=pointer]:
          - generic [ref=e33]: 
    - generic [ref=e34]:
      - button "Account manager for Deepthi R" [ref=e36] [cursor=pointer]:
        - generic [ref=e44]: DR
      - generic: 
  - main [ref=e47]:
    - generic [ref=e49]:
      - heading "Welcome, Deepthi R!" [level=1] [ref=e51]
      - region "quick actions" [ref=e54]:
        - button "Create new notebook" [ref=e55]:
          - img [ref=e57]
          - text: Create new notebook
    - region "My notebooks" [ref=e62]:
      - heading "My notebooks" [level=2] [ref=e63]
      - link "Show all notebooks" [ref=e66] [cursor=pointer]:
        - /url: https://edunotebook-my.sharepoint.com/personal/s-deepthi_edunotebook_onmicrosoft_com/
      - iframe [ref=e69]:
        - generic [active] [ref=f14e1]:
          - link "Skip to main content" [ref=f14e2] [cursor=pointer]:
            - /url: "#main"
          - generic [ref=f14e6]:
            - tablist "Filter list" [ref=f14e10]:
              - tab "Recent" [selected] [ref=f14e11] [cursor=pointer]:
                - img [ref=f14e13]
                - generic [ref=f14e15]: Recent
              - tab "Favorites" [ref=f14e16] [cursor=pointer]:
                - img [ref=f14e18]
                - generic [ref=f14e20]: Favorites
            - main [ref=f14e22]:
              - tabpanel [ref=f14e23]
    - generic [ref=e70]:
      - link "Install Microsoft 365 apps" [ref=e72] [cursor=pointer]:
        - /url: https://go.microsoft.com/fwlink/?linkid=2341472&clcid=0x409
        - img [ref=e74]
        - text: Install Microsoft 365 apps
      - button "Provide feedback" [ref=e77]:
        - img [ref=e78]
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | import type { Page } from '@playwright/test';
  4   | import { accounts } from '../tests for Org and Edu , MSA accounts/testData';
  5   | 
  6   | 
  7   | type Notebook ={
  8   |     name: string;
  9   |     lastModified?: string;
  10  |   };
  11  | 
  12  | export class HomePage {
  13  |   page: Page;
  14  |   constructor(page: Page) {
  15  |     this.page = page;
  16  |   }
  17  |  
  18  |   profileIcon = '[aria-label="Account manager for +${profileName}"]'; // adjust after inspect
  19  |   accountName = '[data-testid="account-email"]'; 
  20  |   header1 = '.fui-LargeTitle'// adjust after inspect
  21  |   header2 = '.fui-Subtitle2'// adjust after inspect
  22  |   recenticon = '[aria-label = "Recent"]';
  23  |   favoritesicon = '[aria-label = "Favorites"]';
  24  |   iframe2Selector = '#FileBrowserIFrame';
  25  |   iframeSelector = '#WebApplicationFrame';
  26  |   openexistingnotebookSelector = "(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]";
  27  |   createNewButton = "//button[text() ='Create new notebook']/span";
  28  |   notebooklocator = '[class*= "nameCellTop"]';
  29  |   notebookicons ='.nameCellIcon_991e267b';
  30  |   recentnotebookcontainer ='#recentListContainer';
  31  |   listcontent ='#list-content-id'
  32  |   providefeedback = '[aria-label="Provide feedback"]';
  33  |   M365notebooklocator ='[class = "EdgeworthItemControl-module__title-text__VvfHp"]';
  34  | 
  35  |  
  36  |   async getLoggedInAccount(profileName: string, accType?: string): Promise<boolean> {
  37  |       
  38  |       //await this.page.waitForLoadState('domcontentloaded');
  39  |       await this.page.waitForTimeout(9000); // ⏳ Wait for potential UI updates
  40  |       //const profilepic = '#mectrl_headerPicture';
  41  |       //await this.page.waitForSelector(profilepic, { timeout: 60000 });
  42  |       //await this.page.locator(profilepic).click();
  43  |       const profilebutton = (this.page.locator('[aria-label="Account manager for ' + profileName + '"]')).or(this.page.locator(`[aria-label="Account Manager Button"]`)).last();
  44  |       if (accType === 'MSA') {
  45  |         await profilebutton.waitFor({ state: 'visible', timeout: 60000 });
  46  |         await profilebutton.scrollIntoViewIfNeeded();
  47  |         await profilebutton.click();
  48  |         } 
  49  |         else { 
  50  |         await expect(async () => {
  51  |           await profilebutton.click();
  52  |           await expect(this.page.locator(`div[aria-label="${profileName}"]`)).toBeVisible();
  53  |         }).toPass({ timeout: 60000});
  54  |         }
  55  |       await this.page.waitForSelector(`div[aria-label="${profileName}"]`, { timeout: 60000 });
  56  |       const accountEmail = await this.page.locator(`div[aria-label="${profileName}"]`).isVisible();
  57  |       return accountEmail;
  58  |     
  59  |   }
  60  | 
  61  | //   async getLoggedInAccount(profileName: string,accType?: string): Promise<boolean> {
  62  |  
  63  | //     const accountBtn = this.page.locator(`[aria-label="Account manager for ${profileName}"]');
  64  |  
  65  | //     await this.page.waitForTimeout(2000);
  66  |  
  67  | //     return await this.page
  68  | //         .locator(`div[aria-label="${profileName}"]`)
  69  | //         .isVisible()
  70  | //         .catch(() => false);
  71  | // }
  72  |  
  73  | 
  74  |   async getBuildVersion(): Promise<string> {
  75  |     const f2 = this.page.frameLocator(this.iframeSelector);
  76  |     await f2.locator('#FileMenuLauncherContainer').click();
  77  |     await f2.locator('.ms-Button-label',{hasText:"About"}).click();
  78  |     const versionText = await f2.locator('#TextInfoSectionValue-1').inputValue();
  79  |     return versionText;
  80  |   }
  81  | 
  82  |   async openExistingNotebook() {
  83  |         if (this.page.isClosed()) throw new Error('Page is closed before openExistingNotebook');
  84  |         console.log('openExistingNotebook: start');
  85  |         await this.page.waitForSelector(this.iframe2Selector, { timeout: 60000 });
  86  |         //const handle = await this.page.$(this.iframe2Selector);
  87  |         //const frame = handle ? await handle.contentFrame() : null;
  88  |         let nbname = '';
  89  |         const fl = this.page.frameLocator(this.iframe2Selector);
  90  |         if (!fl) throw new Error(`Frame ${this.iframe2Selector} not available`);
  91  |         try {
  92  |             // Wait for the notebook list to load
  93  |             console.log('Waiting for notebook list to load...');
> 94  |             await fl.locator(this.openexistingnotebookSelector).waitFor({ state: 'visible', timeout: 30000 });
      |                                                                 ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  95  |             console.log('✓ Notebook list loaded');
  96  |             const nbname = await fl.locator(this.openexistingnotebookSelector).innerText();
  97  |             
  98  |             // use clickWithRetries for stability
  99  |             console.log('Attempting to click on existing notebook...');
  100 |             await expect(fl.locator("(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]")).toBeVisible({ timeout: 60000 });
  101 |             console.log(`Clicked notebook: ${nbname}`);
  102 | 
  103 |             await this.clickWithRetries(fl, "(//button[@class = 'nameCellTop_991e267b nameCellTopContrast'])[1]");
  104 |             console.log('✓ Clicked on existing notebook');
  105 |             
  106 |             await this.page.waitForTimeout(500);           
  107 | 
  108 |         } catch (err) {
  109 |             console.error('openExistingNotebook failed:', err);
  110 |             throw err;
  111 |         }
  112 |         const f2 = this.page.frameLocator(this.iframeSelector);
  113 |         const notebookname = await f2.locator('[data-unique-id="DocumentTitleContent"]').innerText();
  114 |         console.log(`Opened notebook: ${notebookname}`);
  115 |         if (nbname.trim() === notebookname.trim()) {
  116 |             console.log('✓ Notebook opened successfully');
  117 |         }
  118 | 
  119 |         console.log('openExistingNotebook: done');
  120 |     }
  121 | 
  122 |     async createNewNotebook() {
  123 |         console.log('createNewNotebook: start');
  124 |         // trigger UI that opens/attaches the iframe
  125 |         await this.page.locator(this.createNewButton).click().catch(() => {
  126 |             console.warn('createNewButton click failed, trying fallback testid click');
  127 |             return this.page.getByTestId('0300').click().catch(() => {});
  128 |         });
  129 |         const f2 = this.page.frameLocator(this.iframeSelector);
  130 |         await this.page.waitForSelector(this.iframeSelector, { timeout: 60000 });
  131 |         const nbcreated = await f2.locator('[data-unique-id="DocumentTitleContent"]').innerText();
  132 |         console.log(`Created notebook: ${nbcreated}`);
  133 |         }
  134 | 
  135 | 
  136 |     async waitForNotebooksToLoad() {
  137 |         const fl = this.page.frameLocator(this.iframe2Selector);
  138 |         const notebookLocator = fl.locator('button[class*="nameCellTop"]');
  139 | 
  140 |     // 
  141 |     try {    
  142 |     await expect.poll(async() => {
  143 |       return await notebookLocator.count();
  144 |     }, {
  145 |       timeout: 60000,
  146 |       message: 'Notebooks did not load within timeout'
  147 |     }).toBeGreaterThan(0);
  148 |   } catch (err) {
  149 |     console.log('waitForNotebooksToLoad failed, Reloading page and retrying...', err);
  150 |     await this.page.reload();
  151 |     await this.waitForNotebooksToLoad();
  152 |   }
  153 | }
  154 | 
  155 | 
  156 |     async waitForRecentToLoad() {
  157 |         const fl = this.page.frameLocator(this.iframe2Selector);
  158 |         const RecentLocator = fl.getByRole('tab', { name: 'Recent' });
  159 | 
  160 |     // 
  161 |     try {    
  162 |     await expect.poll(async() => {
  163 |       return await RecentLocator.count();
  164 |     }, {
  165 |       timeout: 60000,
  166 |       message: 'Recent items did not load within timeout'
  167 |     }).toBeGreaterThan(0);
  168 |   } catch (err) {
  169 |     console.log('waitForRecentToLoad failed, Reloading page and retrying...', err);
  170 |     await this.page.reload();
  171 |     await this.waitForRecentToLoad();
  172 |   }
  173 | }
  174 | 
  175 | 
  176 |     async getTopNotebooks(
  177 |   source: 'onenote' | 'm365',
  178 |   limit = 6
  179 | ): Promise<Notebook[]> {
  180 |  
  181 |   let notebookLocator;
  182 |  
  183 |   if (source === 'onenote') {
  184 | 
  185 |     //await this.page.reload();
  186 |     await this.page.waitForTimeout(30000);
  187 |  
  188 |     const fl = this.page.frameLocator(this.iframe2Selector);
  189 |  
  190 |     await fl
  191 |       .locator('button[class*="nameCellTop"]')
  192 |       .first()
  193 |       .waitFor({ timeout: 30000 });
  194 |  
```