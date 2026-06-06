# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests for Org and Edu , MSA accounts\accountTests.spec.ts >> Tests for s-deepthi@edunotebook.onmicrosoft.com >> TC1 - Verify logged in account
- Location: pom\tests for Org and Edu , MSA accounts\accountTests.spec.ts:42:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 120000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
    - generic:
      - generic:
        - generic:
          - img "Organization background image" [ref=e2]
          - generic [ref=e3]:
            - generic [ref=e11]:
              - img "Microsoft" [ref=e13]
              - main [ref=e14]:
                - generic [ref=e15]:
                  - generic "s-deepthi@edunotebook.onmicrosoft.com" [ref=e19]
                  - generic [ref=e21]:
                    - heading "Enter code" [level=1] [ref=e22]
                    - generic [ref=e24]: Enter the code displayed in the Microsoft Authenticator app on your mobile device
                    - generic [ref=e26]:
                      - alert
                      - textbox "Enter code" [active] [ref=e29]:
                        - /placeholder: Code
                    - generic [ref=e33]:
                      - generic [ref=e34]:
                        - text: Having trouble?
                        - link "Sign in another way" [ref=e35] [cursor=pointer]:
                          - /url: "#"
                      - link "More information about two step verification" [ref=e37] [cursor=pointer]:
                        - /url: https://go.microsoft.com/fwlink/p/?LinkId=708614
                        - text: More information
                    - button "Verify" [ref=e40] [cursor=pointer]
            - contentinfo [ref=e41]:
              - generic [ref=e42]:
                - link "Terms of use" [ref=e43] [cursor=pointer]:
                  - /url: https://www.microsoft.com/en-US/servicesagreement/
                - link "Privacy & cookies" [ref=e44] [cursor=pointer]:
                  - /url: https://privacy.microsoft.com/en-US/privacystatement
                - button "Click here for troubleshooting information" [ref=e45] [cursor=pointer]: ...
```

# Test source

```ts
  1   | import { BasePage } from './BasePage';
  2   | import type { Page } from '@playwright/test';
  3   | 
  4   | 
  5   |  export class AuthPage {
  6   |   constructor(private page: Page) {}
  7   |   SignIn = '[data-testid="0100"]';
  8   |   M365SignIn = '[aria-label="Sign in"]';
  9   |   emailInput = 'input[type="email"]';
  10  |   passwordInput = 'input[type="password"]';
  11  |   nextBtn = '#idSIButton9';
  12  |   signInBtn = '#idSIButton9';
  13  |   noButton = "//input[@type='button' and @value='No']";
  14  |   yesButton = "//input[@type='button' and @value='Yes']";
  15  |  
  16  |   async login(email: string, password: string , acc?: string): Promise<void> {
  17  | 
  18  |     await this.page.click(this.SignIn);
  19  |     await this.page.fill(this.emailInput, email);
  20  |     await this.page.click(this.nextBtn);
  21  |     await this.page.waitForLoadState('networkidle');
  22  | 
  23  |     if (acc === 'MSA') {
  24  |       //await this.page.pause();
  25  |       await this.page.waitForTimeout(2000); // Wait for potential redirects and page loads after email submission
  26  |       await this.page.keyboard.press('Escape', { delay: 100 });
  27  |       await this.page.waitForSelector('#idA_PWD_SwitchToCredPicker', { state: 'visible', timeout: 10000 });
  28  |       await this.page.locator('#idA_PWD_SwitchToCredPicker').click();
  29  |       await this.page.locator('#fui-CardHeader__header10').waitFor({ state: 'visible', timeout: 10000 });
  30  |       await this.page.locator('#fui-CardHeader__header10').click();
  31  |       await this.page.waitForLoadState('networkidle');
  32  |       const pwdentryLabel = this.page.locator('label[for = "passwordEntry"]');
  33  |       await pwdentryLabel.waitFor({ state: 'visible', timeout: 10000 });
  34  |       await pwdentryLabel.click();
  35  |       await pwdentryLabel.fill(password);
  36  | 
  37  |       const nextBtn = this.page.locator('[data-testid="primaryButton"]');
  38  |       await nextBtn.click();
  39  |       
  40  |       //await this.page.waitForLoadState('networkidle');
  41  | 
  42  |       const staySignedIn = this.page.locator('[data-testid="title"]');
  43  |       if (await staySignedIn.isVisible()) {
  44  |         await nextBtn.click();
  45  |         
  46  |     }
  47  | 
  48  |   }else {
  49  |  
  50  |     const passwordField = this.page.locator('#i0118');
  51  |     await passwordField.waitFor({ state: 'visible', timeout: 10000 });
  52  |  // Wait for potential redirects and page loads after email submission
  53  |     await passwordField.fill(password);
  54  |  
  55  |     await this.page.click(this.signInBtn);
  56  |     await this.page.waitForLoadState('networkidle'); // Wait for potential redirects and page loads after sign-in
  57  |       
  58  |     
  59  | 
  60  |     // CRITICAL: handle "Please enter your password again" re-prompt
  61  |     const reenterPrompt = this.page.locator("text=Please enter your password again").or(
  62  |                 this.page.locator("text=password is incorrect")
  63  |     );
  64  |     const isReenter = await reenterPrompt.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
  65  |     if (isReenter) {
  66  |                 console.warn('Password re-prompt detected, refilling password...');
  67  |                 await passwordField.waitFor({ state: 'visible', timeout: 10000 });
  68  |                 await passwordField.fill(password);
  69  | 
  70  |                 await this.page.click(this.signInBtn);
  71  |                 await this.page.waitForLoadState('networkidle');
  72  |                 
  73  |             }
  74  | 
  75  |     const staySignedInPrompt = this.page.locator("text=Stay signed in");
  76  |      if (await staySignedInPrompt.isVisible()) {
  77  |       await this.page.click('#idSIButton9');
  78  |       //await this.page.waitForLoadState('networkidle');
  79  |     }
  80  |     
  81  |     //Final Validation
> 82  |     await this.page.waitForURL(
      |                     ^ TimeoutError: page.waitForURL: Timeout 120000ms exceeded.
  83  |      url =>
  84  |       !url.toString().includes('login') &&
  85  |       !url.toString().includes('signin'),
  86  |       { timeout: 120000 }
  87  |      );
  88  | 
  89  |     const url = this.page.url();
  90  |     console.log('Final URL', url);
  91  | 
  92  |     // if (url.includes('login') || url.includes('signin')) {
  93  |     //   throw new Error('Login failed, still on authentication page');
  94  |     // }
  95  | 
  96  |    
  97  |     
  98  |   }}
  99  |   async M365login(email: string, password: string , acc?: string): Promise<void> {
  100 | 
  101 |     await this.page.click(this.M365SignIn);
  102 |     if (await this.page.locator(this.emailInput).isVisible()){
  103 |     await this.page.fill(this.emailInput, email);
  104 |     await this.page.click(this.nextBtn);
  105 |     await this.page.waitForLoadState('networkidle');
  106 | 
  107 |     if (acc === 'MSA') {
  108 |       //await this.page.pause();
  109 |       await this.page.waitForTimeout(2000); // Wait for potential redirects and page loads after email submission
  110 |       await this.page.keyboard.press('Escape', { delay: 100 });
  111 |       await this.page.waitForSelector('#idA_PWD_SwitchToCredPicker', { state: 'visible', timeout: 10000 });
  112 |       await this.page.locator('#idA_PWD_SwitchToCredPicker').click();
  113 |       await this.page.locator('#fui-CardHeader__header10').waitFor({ state: 'visible', timeout: 10000 });
  114 |       await this.page.locator('#fui-CardHeader__header10').click();
  115 |       await this.page.waitForLoadState('networkidle');
  116 |       const pwdentryLabel = this.page.locator('label[for = "passwordEntry"]');
  117 |       await pwdentryLabel.waitFor({ state: 'visible', timeout: 10000 });
  118 |       await pwdentryLabel.click();
  119 |       await pwdentryLabel.fill(password);
  120 | 
  121 |       const nextBtn = this.page.locator('[data-testid="primaryButton"]');
  122 |       await nextBtn.click();
  123 |       
  124 |       //await this.page.waitForLoadState('networkidle');
  125 | 
  126 |       const staySignedIn = this.page.locator('[data-testid="title"]');
  127 |       if (await staySignedIn.isVisible()) {
  128 |         await nextBtn.click();
  129 |         
  130 |     }
  131 | 
  132 |   }else {
  133 |  
  134 |     const passwordField = this.page.locator('#i0118');
  135 |     await passwordField.waitFor({ state: 'visible', timeout: 10000 });
  136 |  // Wait for potential redirects and page loads after email submission
  137 |     await passwordField.fill(password);
  138 |  
  139 |     await this.page.click(this.signInBtn);
  140 |     await this.page.waitForLoadState('networkidle'); // Wait for potential redirects and page loads after sign-in
  141 |       
  142 |     
  143 | 
  144 |     // CRITICAL: handle "Please enter your password again" re-prompt
  145 |     const reenterPrompt = this.page.locator("text=Please enter your password again").or(
  146 |                 this.page.locator("text=password is incorrect")
  147 |     );
  148 |     const isReenter = await reenterPrompt.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
  149 |     if (isReenter) {
  150 |                 console.warn('Password re-prompt detected, refilling password...');
  151 |                 await passwordField.waitFor({ state: 'visible', timeout: 10000 });
  152 |                 await passwordField.fill(password);
  153 | 
  154 |                 await this.page.click(this.signInBtn);
  155 |                 await this.page.waitForLoadState('networkidle');
  156 |                 
  157 |             }
  158 | 
  159 |     const staySignedInPrompt = this.page.locator("text=Stay signed in");
  160 |      if (await staySignedInPrompt.isVisible()) {
  161 |       await this.page.click('#idSIButton9');
  162 |       //await this.page.waitForLoadState('networkidle');
  163 |     }
  164 |     
  165 |     //Final Validation
  166 | 
  167 |     const url = this.page.url();
  168 |     console.log('Final URL', url);
  169 | 
  170 |     if (url.includes('login') || url.includes('signin')) {
  171 |       throw new Error('Login failed, still on authentication page');
  172 |     }
  173 | 
  174 |   }
  175 |     
  176 |   }}}
  177 |   
  178 | 
  179 |   // async fillPassword(password: string): Promise<boolean> {
  180 |   //   try {
  181 |   //     await this.page.waitForSelector(this.passwordInput, { state: 'visible', timeout: 10000 });
  182 |   //     await this.page.fill(this.passwordInput, password); 
```