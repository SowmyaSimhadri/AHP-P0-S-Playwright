import { test as base,expect,Browser,Page, TestInfo } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { testAccounts } from '../tests/test-config';
 
type Account = {
  type: string;
  email: string;
  password: string;
  profile?: string;
};
 
type Fixtures = {
  loggedInPage: any;
  account: Account;
};
export {expect};
export const test = base.extend<Fixtures>({
 
  account: async ({}, use, testInfo: TestInfo) => {
   const projectName = testInfo.project.name as keyof typeof testAccounts;
 
  const acc = testAccounts[projectName];
 
  if (!acc) {
    throw new Error(`No account found for project: ${projectName}`);
  }
 
  console.log(`Using ${projectName} account: ${acc.email}`);
 
  await use(acc);

  },
 
  loggedInPage: async (
  { browser, account }: { browser: Browser; account: Account },
  use: (page: Page) => Promise<void>
) => {
 
  const context = await browser.newContext();
  const page = await context.newPage();
 
  const auth = new AuthPage(page);
 
  await page.goto('https://onenote.cloud.microsoft/');
  await auth.login(account.email, account.password);
 
  await page.waitForLoadState('networkidle');
 
  if (page.url().includes('login')) {
    throw new Error(`Login failed for ${account.type}`);
  }
 
  await use(page);
  await context.close();
}});