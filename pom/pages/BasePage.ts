import type { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
      referer: 'https://www.bing.com/'
    });
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.click(selector);
    // Add small delay after clicks to simulate human behavior
    await this.page.waitForTimeout(500);
  }

  async textContent(selector: string): Promise<string | null> {
    return this.page.locator(selector).textContent();
  }

  async waitForUrl(pattern: RegExp | string, options = {}): Promise<void> {
    await this.page.waitForURL(pattern, { timeout: 30000, ...options });
  }

  currentUrl(): string {
    return this.page.url();
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async screenshot(options?: { path?: string; fullPage?: boolean }): Promise<Buffer> {
    return this.page.screenshot(options);
  }
}