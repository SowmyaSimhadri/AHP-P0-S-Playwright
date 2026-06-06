# OneNote AHP Sign-In Test Case Mapping

## Purpose

Map the high-level sign-in test scenarios to the current Playwright automation artifacts in this repository.

## Test Cases

### TC-01: Sign-in initiation

- Objective: Verify `Sign in` starts the authentication flow.
- Environment URL:
  - Production: `https://onenote.cloud.microsoft/`
- Browsers: Chrome, Edge, Firefox
- Playwright artifact: `tests for Org and Edu accounts/accountTests.spec.ts`, `tests for Org and Edu accounts/MSATests.spec.ts`
- Page object: `pages/HomePage.ts`, `pages/AuthPage.ts`
- Verification:
  - `page.click()` on the sign-in control
  - the app navigates into the OneNote authenticated experience

### TC-02: Successful sign-in redirect back to originating URL

- Objective: Confirm the app returns to the originating OneNote URL after sign-in.
- Environment URL: `https://onenote.cloud.microsoft/`
- Browsers: Chrome, Edge, Firefox
- Playwright artifact: `tests for Org and Edu accounts/accountTests.spec.ts`, `tests for Org and Edu accounts/MSATests.spec.ts`
- Page object: `pages/HomePage.ts`, `pages/AuthPage.ts`
- Verification:
  - the post-sign-in URL is not a login or signin page
  - the OneNote app loads successfully after authentication

### TC-03: Active account is the signed-in account

- Objective: Validate that the active account shown in the app matches the signed-in identity.
- Environment URL: `https://onenote.cloud.microsoft/`
- Browsers: Chrome, Edge, Firefox
- Playwright artifact: `tests for Org and Edu accounts/accountTests.spec.ts`, `tests for Org and Edu accounts/MSATests.spec.ts`
- Page object: `pages/HomePage.ts`
- Verification:
  - the active account indicator appears
  - the displayed profile name or email matches the signed-in account

## Notes

- Current test implementation uses separate suites for Org/Edu and MSA account flows.
- Selectors may require updates as the OneNote DOM and auth pages evolve.
- For future maintenance, consider extracting repeated auth sequences from `pages/AuthPage.ts` into shared helpers.
