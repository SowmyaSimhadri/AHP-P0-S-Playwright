# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests for Org and Edu , MSA accounts\accountTests.spec.ts >> Tests for s-deepthi@edunotebook.onmicrosoft.com >> TC4 - UI Elements Verification
- Location: pom\tests for Org and Edu , MSA accounts\accountTests.spec.ts:162:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#FileBrowserIFrame').contentFrame().getByPlaceholder('Filter by name or person')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('#FileBrowserIFrame').contentFrame().getByPlaceholder('Filter by name or person')

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
        - generic [active] [ref=f23e1]:
          - link "Skip to main content" [ref=f23e2] [cursor=pointer]:
            - /url: "#main"
          - generic [ref=f23e3]:
            - generic [ref=f23e6]:
              - tablist "Filter list" [ref=f23e10]:
                - tab "Recent" [selected] [ref=f23e11] [cursor=pointer]:
                  - img [ref=f23e13]
                  - generic [ref=f23e15]: Recent
                - tab "Favorites" [ref=f23e16] [cursor=pointer]:
                  - img [ref=f23e18]
                  - generic [ref=f23e20]: Favorites
              - main [ref=f23e22]:
                - tabpanel [ref=f23e23]
            - generic [ref=f23e25]:
              - button "3️⃣ ✓" [ref=f23e26] [cursor=pointer]:
                - text: 3️⃣
                - generic [ref=f23e27]: ✓
              - button "⚛️ ✗" [ref=f23e28] [cursor=pointer]:
                - text: ⚛️
                - generic [ref=f23e29]: ✗
              - button "ODSP Labs" [ref=f23e30] [cursor=pointer]:
                - img "ODSP Labs" [ref=f23e31]
              - button "🔍" [ref=f23e32] [cursor=pointer]
              - button "🐞" [ref=f23e33] [cursor=pointer]
              - button "DF -" [ref=f23e34] [cursor=pointer]
              - 'button "😐 FCI: ..." [ref=f23e35] [cursor=pointer]':
                - generic [ref=f23e36]: 😐
                - generic [ref=f23e37]: "FCI: ..."
              - button "🔄" [ref=f23e38] [cursor=pointer]
              - button "⚛️" [ref=f23e39] [cursor=pointer]
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
  203 |     await this.page.waitForSelector(
  204 |       '[class*="title-text"]',
  205 |       { timeout: 30000 }
  206 |     );
  207 |  
  208 |     notebookLocator = this.page.locator('[class*="title-text"]');
  209 |  
  210 |     // 🔥 force lazy loading
  211 |     const countBefore = await notebookLocator.count();
  212 |  
  213 |     if (countBefore < limit) {
  214 |  
  215 |   for (let i = 0; i < 5; i++) {
  216 |  
  217 |     // 🔥 Scroll whole page instead of locator
  218 |     await this.page.mouse.wheel(0, 500);
  219 |  
  220 |     await this.page.waitForTimeout(2000);
  221 |  
  222 |     const currentCount = await notebookLocator.count();
  223 |  
  224 |     console.log(`Scrolled count: ${currentCount}`);
  225 |  
  226 |     if (currentCount >= limit) {
  227 |       break;
  228 |     }
  229 |   }
  230 | }
  231 |   }
  232 |  
  233 |   // 🔥 COMMON extraction logic
  234 |   const list: Notebook[] = await notebookLocator.evaluateAll(
  235 |     (elements, limit) => {
  236 |  
  237 |       return elements.slice(0, limit).map(el => {
  238 |  
  239 |         // 🔹 NAME extraction
  240 |         const name =
  241 |           el.getAttribute('title') ||
  242 |           el.getAttribute('aria-label') ||
  243 |           el.textContent ||
  244 |           '';
  245 |  
  246 |         // 🔹 LAST MODIFIED extraction
  247 |         let time = '';
  248 |  
  249 |         const row = el.closest('[role="gridcell"]');
  250 |  
  251 |         // Option 1
  252 |         if (row) {
  253 |  
  254 |           const timeEl = row.querySelector(
  255 |             '[data-automationid="field-openedDate"]'
  256 |           );
  257 |  
  258 |           if (timeEl) {
  259 |             time = timeEl.textContent || '';
  260 |           }
  261 |         }
  262 |  
  263 |         // Option 2
  264 |         if (!time) {
  265 |  
  266 |           const timeEl = el.querySelector(
  267 |             '[class*="document-column__date"]'
  268 |           );
  269 |  
  270 |           if (timeEl) {
  271 |             time = timeEl.textContent || '';
  272 |           }
  273 |         }
  274 |  
  275 |         return {
  276 |           name: name.trim(),
  277 |           lastModified: time.trim()
  278 |         };
  279 |       });
  280 |  
  281 |     },
  282 |     limit
  283 |   );
  284 |  
  285 |   console.log(`✅ Notebook count (${source}):`, list.length);
  286 |  
  287 |   return list;
  288 | }
  289 | 
  290 | 
  291 |     async VerifyUIElements(profileName: string) {
  292 |         const profilebutton = this.page.locator(`[aria-label="Account manager for ${profileName}"]`).or(this.page.locator(`[aria-label="Account Manager Button"]`));
  293 |         await expect(profilebutton).toBeVisible();
  294 |         await expect(this.page.locator('h1:has-text("Welcome")')).toBeVisible();
  295 |         await expect(this.page.locator('h2:has-text("My notebooks")')).toBeVisible();
  296 |         await expect(this.page.locator(this.createNewButton)).toBeVisible();
  297 |         const fl = this.page.frameLocator(this.iframe2Selector);
  298 |         await fl.getByRole('tab', { name: 'Recent' }).waitFor({ timeout: 30000 });
  299 |         await expect(fl.getByRole('tab', { name: 'Recent' })).toBeVisible();
  300 |         //await expect(this.page.locator('span:has-text("Recent")')).toBeVisible();
  301 |         await expect.soft(fl.getByRole('tab', { name: 'Favorites' })).toBeVisible();
  302 |         await expect(this.page.locator('a:has-text("Show all notebooks")')).toBeVisible();
> 303 |         await expect(fl.getByPlaceholder("Filter by name or person")).toBeVisible();
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  304 |         const notebooks = await fl.locator(this.notebooklocator).count();
  305 |         expect(notebooks).toBeGreaterThan(0);
  306 |         const icons = await fl.locator(this.notebookicons).count();
  307 |         expect(icons).toBeGreaterThan(0);
  308 |         await expect(fl.locator(this.recentnotebookcontainer)).toBeVisible();
  309 |         await expect(fl.locator(this.listcontent)).toBeVisible();
  310 |         await expect(fl.locator('span:has-text("Name")')).toBeVisible();
  311 |         await expect(fl.locator('span:has-text("Opened")')).toBeVisible();
  312 |         await expect(fl.locator('span:has-text("Owner")')).toBeVisible();
  313 |         //await expect.soft(fl.locator('span:has-text("Activity")')).toBeVisible();
  314 |         const gridCells = fl.locator('[role="gridcell"]');
  315 |  
  316 |         const count = await gridCells.count();
  317 |  
  318 |         for (let i = 0; i < count; i++) {
  319 |  
  320 |            const box = await gridCells.nth(i).boundingBox();
  321 |  
  322 |            //expect(box).not.toBeNull();
  323 |  
  324 |            if (box) {
  325 |              expect(box.width).toBeGreaterThan(100);
  326 |              expect(box.height).toBeGreaterThan(50);
  327 |           }
  328 |         }
  329 |         await this.page.locator(this.providefeedback).scrollIntoViewIfNeeded();
  330 |         //await this.page.pause();
  331 |         await expect(this.page.locator(this.providefeedback)).toBeVisible();
  332 |         await expect(this.page.locator('a:has-text("Install Microsoft 365 apps")')).toBeVisible();
  333 |       }
  334 | 
  335 |     async VerifyUIElementsforMSA(profileName: string) {
  336 |         const profilebutton = this.page.locator(`[aria-label="Account manager for ${profileName}"]`).or(this.page.locator(`[aria-label="Account Manager Button"]`));
  337 |         await expect(profilebutton).toBeVisible();
  338 |         await expect(this.page.locator('h1:has-text("Welcome")')).toBeVisible();
  339 |         await expect(this.page.locator('h2:has-text("My notebooks")')).toBeVisible();
  340 |         await expect(this.page.locator(this.createNewButton)).toBeVisible();
  341 |         const fl = this.page.frameLocator(this.iframe2Selector);
  342 |         try {
  343 |         await fl.getByRole('tab', { name: 'Recent' }).waitFor({ timeout: 30000 });
  344 |         await expect(fl.getByRole('tab', { name: 'Recent' })).toBeVisible();}
  345 |         catch(e) {
  346 |             console.log('Recent tab not visible, retrying...', e);
  347 |             await this.waitForRecentToLoad();
  348 |         }
  349 |         //await expect(this.page.locator('span:has-text("Recent")')).toBeVisible();
  350 |         //await expect.soft(fl.getByRole('tab', { name: 'Favorites' })).toBeVisible();
  351 |         await expect(this.page.locator('a:has-text("Show all notebooks")')).toBeVisible();
  352 |         await expect(fl.getByPlaceholder("Filter by name or person")).toBeVisible();
  353 |         const notebooks = await fl.locator(this.notebooklocator).count();
  354 |         expect(notebooks).toBeGreaterThan(0);
  355 |         const icons = await fl.locator(this.notebookicons).count();
  356 |         expect(icons).toBeGreaterThan(0);
  357 |         await expect(fl.locator(this.recentnotebookcontainer)).toBeVisible();
  358 |         await expect(fl.locator(this.listcontent)).toBeVisible();
  359 |         await expect(fl.locator('span:has-text("Name")')).toBeVisible();
  360 |         await expect(fl.locator('span:has-text("Opened")')).toBeVisible();
  361 |         await expect(fl.locator('span:has-text("Owner")')).toBeVisible();
  362 |         //await expect.soft(fl.locator('span:has-text("Activity")')).toBeVisible();
  363 |         const gridCells = fl.locator('[role="gridcell"]');
  364 |  
  365 |         const count = await gridCells.count();
  366 |  
  367 |         for (let i = 0; i < count; i++) {
  368 |  
  369 |            const box = await gridCells.nth(i).boundingBox();
  370 |  
  371 |            //expect(box).not.toBeNull();
  372 |  
  373 |            if (box) {
  374 |              expect(box.width).toBeGreaterThan(100);
  375 |              expect(box.height).toBeGreaterThan(50);
  376 |           }
  377 |         }
  378 |         await this.page.locator(this.providefeedback).scrollIntoViewIfNeeded();
  379 |         //await this.page.pause();
  380 |         await expect(this.page.locator(this.providefeedback)).toBeVisible();
  381 |         await expect(this.page.locator('a:has-text("Install Microsoft 365 apps")')).toBeVisible();
  382 |       }
  383 | 
  384 |     async clickWithRetries(frameOrPage : any, selector : any, maxAttempts = 4) {
  385 |         for (let attempt = 0; attempt < maxAttempts; attempt++) {
  386 |             try {
  387 |                 const loc = frameOrPage.locator(selector).first();
  388 |                 await loc.waitFor({ state: 'visible', timeout: 4000 });
  389 |                 await loc.scrollIntoViewIfNeeded().catch(() => null);
  390 | 
  391 |                 // 1) normal click
  392 |                 try { await loc.click({ timeout: 5000 }); return true; } catch {}
  393 | 
  394 |                 // 2) force click
  395 |                 try { await loc.click({ force: true, timeout: 3000 }); return true; } catch {}
  396 | 
  397 |                 // 3) DOM click via evaluate
  398 |                 const handle = await loc.elementHandle();
  399 |                 if (handle) {
  400 |                     const clicked = await this.page.evaluate((el) => {
  401 |                         try { el.scrollIntoView({block:'center'}); el.click(); return true; } catch { return false; }
  402 |                     }, handle).catch(() => false);
  403 |                     if (clicked) return true;
```