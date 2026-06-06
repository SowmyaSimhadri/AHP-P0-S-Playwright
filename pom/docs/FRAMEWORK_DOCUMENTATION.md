# OneNote AHP Playwright Framework Documentation

## Overview

This documentation describes the OneNote automation framework built using Playwright and TypeScript. The framework validates sign-in flows for OneNote, compares notebooks between OneNote and M365, and validates core UI interactions.

## Goals

- Validate sign-in for Organization, Education, and Microsoft accounts
- Verify OneNote app access after login
- Compare notebooks between OneNote and M365 experiences
- Maintain a reusable Page Object Model
- Keep test execution stable across Chrome, Edge, and Firefox

## Architecture

### Page Object Model (POM)

The framework uses page objects to separate page interaction logic from test orchestration.

- `pages/BasePage.ts` — Generic helpers for navigation, click handling, waiting, and screenshots
- `pages/AuthPage.ts` — Authentication workflows for OneNote and M365
- `pages/HomePage.ts` — OneNote page interactions and notebook operations

### Test organization

- `tests for Org and Edu accounts/accountTests.spec.ts` — Org/Edu sign-in scenarios, notebook compare, auth, and UI checks
- `tests for Org and Edu accounts/MSATests.spec.ts` — MSA-specific tests using persistent Chromium profile
- `tests for Org and Edu accounts/testData.ts` — Account data for Org, Edu, and MSA
- `fixtures/authFixture.ts` — Optional authenticated fixture for reuse in other tests

## Framework behavior

### Authentication

`pages/AuthPage.ts` contains two login flows:

- `login(email, password, acc)` — performs authentication from the OneNote page
- `M365login(email, password, acc)` — performs authentication from the M365 landing page

Both functions:

- enter email and click Next
- fill password
- handle MSA-specific credential picker screens
- detect and click stay-signed-in prompts
- validate final URL to ensure login succeeded

### OneNote workflows

`pages/HomePage.ts` provides:

- `getLoggedInAccount(profileName, accType)` — verifies the signed-in identity
- `getTopNotebooks(source, limit)` — extracts notebook names and last modified metadata
- `openExistingNotebook()` — opens the first notebook in the list and verifies it loaded
- `createNewNotebook()` — triggers notebook creation and confirms the UI updates
- `VerifyUIElements(profileName)` — validates key page elements and notebook list components

## Configuration

`playwright.config.ts` sets the global test environment:

- `testDir: './'`
- `timeout: 180000`
- `expect.timeout: 15000`
- `headless: false`
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `workers: 1`
- Projects:
  - `Chrome` — Chromium with Chrome channel
  - `Edge` — Chromium with Edge channel and anti-automation args
  - `Firefox`

## Setup

1. Install dependencies:

```bash
npm install
npx playwright install
```

2. Update test account credentials in `tests for Org and Edu accounts/testData.ts`.
3. Run tests:

```bash
npm test
```

### Running a single browser

```bash
npm run test:chromium
npm run test:firefox
```

### Running headed

```bash
npx playwright test --headed
```

## Test data

`tests for Org and Edu accounts/testData.ts` defines the current test accounts.

- `accounts` — Org and Edu accounts
- `MSAaccounts` — MSA accounts

Update this file with valid credentials before running the suite.

## Test case coverage

### accountTests.spec.ts

- TC1: Verify logged-in account displayed after auth
- TC2: Compare top notebooks between OneNote and M365
- TC3: Validate notebook open/create flows
- TC4: Verify OneNote UI elements and page state

### MSATests.spec.ts

- Builds on the same core checks with MSA-specific login handling
- Uses a persistent Chromium profile for session reuse

## Recommended maintenance

### Keep selectors current

The framework depends on selectors in the OneNote app and Microsoft auth pages. If UI changes:

- update `AuthPage.ts` selectors for email/password flows
- update `HomePage.ts` selectors for notebook list and account validation

### Reduce flaky waits

Current code uses some explicit timeouts and wait loops. Improve reliability by:

- preferring `locator.waitFor()` over fixed `waitForTimeout()` where possible
- using `expect(locator).toBeVisible()` and `page.waitForURL()` for deterministic state

### Refactor duplicate logic

`AuthPage.ts` has duplicate login logic in `login()` and `M365login()`. Consider extracting common steps to:

- a shared `enterEmailAndPassword()` helper
- a reusable `handleStaySignedIn()` helper
- a generic `waitForAuthentication()` helper

## Troubleshooting

### Common failures

- Login hangs on auth page: verify account credentials and auth flow selectors
- Notebook compare mismatch: ensure both OneNote and M365 list extraction selectors are valid
- Element not found: update DOM selectors after OneNote UI changes

### Debugging tips

- Run tests in headed mode: `npx playwright test --headed`
- Review Playwright HTML report: `npx playwright show-report`
- Inspect error screenshots and videos in `test-results/`

## Future improvements

- move secrets to environment variables or a secure vault
- add a reusable M365 page object for app launcher navigation
- support more validation URLs (`Fastfood`, `Dogfood`, `Production`)
- split broad spec files into smaller descriptive suites
- add typed interfaces for account and notebook metadata
