# OneNote AHP Playwright POM Framework

A TypeScript Playwright test framework built from scratch to validate OneNote login, M365 notebook comparison, and UI flow across Org, Edu, and MSA accounts.

## What this framework covers

- Cross-browser test execution in Chrome, Edge, and Firefox
- OneNote sign-in validation for Organization, Education, and Microsoft accounts
- OneNote ↔ M365 notebook list comparison
- Notebook open/create validation and UI element verification
- Page Object Model structure for reusable page interactions
- Headed execution, screenshots, and video capture on failure

## Project structure

```
pom/
├── fixtures/
│   └── authFixture.ts                  # Playwright fixture for login setup
├── pages/
│   ├── AuthPage.ts                     # Microsoft auth flow implementation
│   ├── BasePage.ts                     # Shared page helper methods
│   └── HomePage.ts                     # OneNote home & notebook actions
├── playwright-report/                  # Generated Playwright HTML reports
├── tests for Org and Edu accounts/
│   ├── accountTests.spec.ts            # Org/Edu sign-in + notebook validation
│   ├── MSATests.spec.ts                # MSA account-specific test suite
│   ├── testData.ts                     # Test account definitions
│   └── test-urls.ts                    # Environment URL collection
├── playwright.config.ts                # Playwright configuration & browser projects
├── package.json                        # npm scripts and dev dependencies
├── README.md                           # Framework overview and getting started
└── docs/
    └── FRAMEWORK_DOCUMENTATION.md      # Detailed framework reference
```

## Quick start

```bash
cd "c:/Users/v-simsowmya/OneDrive - Microsoft/Documents/OneNote AHP P0's/pom"
npm install
npx playwright install
npm test
```

### Run a specific browser

```bash
npm run test:chromium
npm run test:firefox
```

### Run headed mode for debugging

```bash
npx playwright test --headed
```

## Key files

- `playwright.config.ts` — browser projects, timeouts, screenshot/video capture, worker count
- `pages/AuthPage.ts` — auth form handling for email, password, MSA-specific flows and stay-signed-in prompts
- `pages/HomePage.ts` — OneNote home page interactions, notebook validation, UI verification
- `tests for Org and Edu accounts/accountTests.spec.ts` — Org/Edu test flows
- `tests for Org and Edu accounts/MSATests.spec.ts` — MSA-specific flow using persistent Chromium context
- `tests for Org and Edu accounts/testData.ts` — account definitions for Org, Edu, and MSA
- `fixtures/authFixture.ts` — reusable login fixture for authenticated test setup

## How the framework works

### Auth flow

- `AuthPage.login()` performs sign-in from `onenote.cloud.microsoft`
- `AuthPage.M365login()` performs sign-in from `m365.cloud.microsoft`
- Handles email entry, password entry, and conditional flows for MSA
- Detects and handles stay-signed-in prompts and password re-prompt behavior

### OneNote page interactions

- `HomePage.getLoggedInAccount()` verifies the active account display
- `HomePage.openExistingNotebook()` opens the first notebook from the recent list
- `HomePage.createNewNotebook()` triggers notebook creation and verifies the new notebook UI
- `HomePage.getTopNotebooks()` extracts top notebook metadata for OneNote and M365
- `HomePage.VerifyUIElements()` validates key UI elements and notebook lists

## Supported account types

- `ORG` — Azure AD organization accounts
- `EDU` — Education tenant accounts
- `MSA` — Microsoft personal accounts

## Test data

Edit `tests for Org and Edu accounts/testData.ts` to update or add new accounts.

```ts
export const accounts = [
  { type: 'ORG', email: '...', password: '...', profile: '...' },
  { type: 'EDU', email: '...', password: '...', profile: '...' }
];

export const MSAaccounts = [
  { type: 'MSA', email: '...', password: '...', profile: '...' }
];
```

## Browser configuration

- Projects: `Chrome`, `Edge`, `Firefox`
- `headless: false` by default for interactive debugging
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `workers: 1` to avoid session conflicts during authentication flows

## Notes for maintainers

- Some selectors are fragile and use XPath or visible text; update them when OneNote UI changes
- `AuthPage` contains two similar login methods (`login` and `M365login`) that can be refactored later
- `HomePage.getTopNotebooks()` currently supports both OneNote and M365 notebook lists
- Keep account credentials secure and avoid committing them to version control

## Recommended improvements

- Move account credentials to environment variables or a secure vault
- Add a dedicated page object for the M365 app launcher
- Refactor duplicate auth logic into shared helper methods
- Add typed interfaces for notebook metadata and account types
- Improve test stability by using explicit waits instead of fixed timeouts

## Where to find more information

- Detailed framework reference: `docs/FRAMEWORK_DOCUMENTATION.md`
- Test plan and case mapping: `signin-test-plan.md`, `signin-test-case-mapping.md`

## Commands

```bash
npm install
npx playwright install
npm test
npm run test:chromium
npm run test:firefox
npx playwright show-report
```


## Storage state / authenticated sessions

If your tests need an authenticated browser session, set `STORAGE_STATE` to the path of a Playwright storage state file:

```powershell
$env:STORAGE_STATE = 'auth-state.json'
npm test
```

This is required for `signin-redirect.spec.ts` and `active-account.spec.ts` when you validate an already-signed-in account.

## Notes

- Update `HomePage.ts` locators to match the actual application DOM.
- The test verifies sign-in initiation, redirect back to OneNote, and that an active signed-in account is shown.
- If interactive Azure AD login requires credentials, use Playwright authentication state or a dedicated auth page object.
