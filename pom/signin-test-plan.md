# OneNote AHP Sign-In Test Plan

## Prerequisites

- Validation URLs:
  - Fastfood: `https://onenote.cloud.dev.microsoft/?access=WebSharedMicrosoft`
  - Dogfood: `https://df.onenote.cloud.microsoft/?access=OPGMicrosoft`
  - Production: `https://onenote.cloud.microsoft/`
- Supported browsers:
  - Edge
  - Chrome
  - Firefox (Mozilla)
- Access to a valid test account for sign-in validation.
- Browser environment clean state or private/incognito sessions for each run.

## Test Scope

Validate the OneNote sign-in flow for each target environment and each supported browser.

## Test Scenarios

### Scenario 1: Sign-in initiation

1. Navigate to the target validation URL.
2. Click the `Sign in` control in the top right corner.

Expected results:
- Sign-in flow starts immediately.
- The browser is redirected to the authentication page or sign-in prompt.

### Scenario 2: Successful sign-in and return to originating URL

1. Navigate to the target validation URL.
2. Click `Sign in`.
3. Complete the sign-in process using a valid account.
4. Return to the originating OneNote URL after authentication.

Expected results:
- Redirect returns to the originating OneNote URL.
- The active account displayed in the app is the same account used to sign in.
- The app remains on the correct environment (Fastfood / Dogfood / Production).

### Scenario 3: Active account verification after redirect

1. Perform sign-in as in Scenario 2.
2. After redirect, locate the active account indicator.

Expected results:
- The active account field is visible.
- The account name or email matches the signed-in identity.

### Scenario 4: Cross-browser consistency

Execute Scenarios 1–3 on:
- Edge
- Chrome
- Firefox

Expected results:
- Sign-in initiation works consistently across all browsers.
- Redirect behavior and account persistence are stable across browsers.

## Environment Matrix

| Environment | URL | Browser |
| --- | --- | --- |
| Fastfood | `https://onenote.cloud.dev.microsoft/?access=WebSharedMicrosoft` | Edge, Chrome, Firefox |
| Dogfood | `https://df.onenote.cloud.microsoft/?access=OPGMicrosoft` | Edge, Chrome, Firefox |
| Production | `https://onenote.cloud.microsoft/` | Edge, Chrome, Firefox |

## Notes

- If authentication uses Azure AD or a federated identity provider, ensure the test account has appropriate access.
- For automated Playwright tests, consider storing authentication state or using a dedicated login helper if the sign-in prompt is interactive.
- Validate the exact DOM selectors for `Sign in` and active account display before automation.

## Recommended Test Execution

1. Run each environment sequentially using a clean browser profile.
2. Confirm sign-in initiation and redirect behavior first.
3. Verify the active signed-in account after returning to OneNote.
4. Repeat on all supported browsers.
