import { defineConfig } from '@playwright/test';
import '@playwright/test';

declare module '@playwright/test' {
  interface PlaywrightTestOptions {
    account?: {
      type: string;
      email: string;
      password: string;
      profile?: string;
    };
  }
}

export default defineConfig({
  testDir: './',
  timeout: 200000, // Increased timeout for auth flows
  expect: {
    timeout: 15000,
  },
  testMatch: /.*\.spec\.ts$/,
  reporter:[['html', { open: 'always' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: null,
    ignoreHTTPSErrors: true,
    storageState: undefined,
  
    
  },
  projects: [
 
  {
    name: 'Chrome',
    use: {
      browserName: 'chromium',
      channel: 'chrome'
    }
  },
 
  {
    name: 'Edge',
    use: {
      browserName: 'chromium',
      channel: 'msedge',
      launchOptions: {
        slowMo: 100, // Slow down Edge to help with stability
        args:['--disable-blink-features=AutomationControlled']
      }
    }
  },
 
  {
    name: 'Firefox',
    use: {
      browserName: 'firefox'
    }
  }
 
],
workers: 1, // Run tests sequentially to avoid session conflicts
});