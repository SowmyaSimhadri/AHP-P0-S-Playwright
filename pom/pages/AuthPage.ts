import { BasePage } from './BasePage';
import type { Page } from '@playwright/test';


 export class AuthPage {
  constructor(private page: Page) {}
  SignIn = '[data-testid="0100"]';
  M365SignIn = '[aria-label="Sign in"]';
  emailInput = 'input[type="email"]';
  passwordInput = 'input[type="password"]';
  nextBtn = '#idSIButton9';
  signInBtn = '#idSIButton9';
  noButton = "//input[@type='button' and @value='No']";
  yesButton = "//input[@type='button' and @value='Yes']";
 
  async login(email: string, password: string , acc?: string): Promise<void> {

    await this.page.click(this.SignIn);
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.nextBtn);
    await this.page.waitForLoadState('networkidle');

    if (acc === 'MSA') {
      //await this.page.pause();
      await this.page.waitForTimeout(2000); // Wait for potential redirects and page loads after email submission
      await this.page.keyboard.press('Escape', { delay: 100 });
      await this.page.waitForSelector('#idA_PWD_SwitchToCredPicker', { state: 'visible', timeout: 10000 });
      await this.page.locator('#idA_PWD_SwitchToCredPicker').click();
      await this.page.locator('#fui-CardHeader__header10').waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator('#fui-CardHeader__header10').click();
      await this.page.waitForLoadState('networkidle');
      const pwdentryLabel = this.page.locator('label[for = "passwordEntry"]');
      await pwdentryLabel.waitFor({ state: 'visible', timeout: 10000 });
      await pwdentryLabel.click();
      await pwdentryLabel.fill(password);

      const nextBtn = this.page.locator('[data-testid="primaryButton"]');
      await nextBtn.click();
      
      //await this.page.waitForLoadState('networkidle');

      const staySignedIn = this.page.locator('[data-testid="title"]');
      if (await staySignedIn.isVisible()) {
        await nextBtn.click();
        
    }

  }else {
 
    const passwordField = this.page.locator('#i0118');
    await passwordField.waitFor({ state: 'visible', timeout: 10000 });
 // Wait for potential redirects and page loads after email submission
    await passwordField.fill(password);
 
    await this.page.click(this.signInBtn);
    await this.page.waitForLoadState('networkidle'); // Wait for potential redirects and page loads after sign-in
      
    

    // CRITICAL: handle "Please enter your password again" re-prompt
    const reenterPrompt = this.page.locator("text=Please enter your password again").or(
                this.page.locator("text=password is incorrect")
    );
    const isReenter = await reenterPrompt.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
    if (isReenter) {
                console.warn('Password re-prompt detected, refilling password...');
                await passwordField.waitFor({ state: 'visible', timeout: 10000 });
                await passwordField.fill(password);

                await this.page.click(this.signInBtn);
                await this.page.waitForLoadState('networkidle');
                
            }

    const staySignedInPrompt = this.page.locator("text=Stay signed in");
     if (await staySignedInPrompt.isVisible()) {
      await this.page.click('#idSIButton9');
      //await this.page.waitForLoadState('networkidle');
    }
    
    //Final Validation
    await this.page.waitForURL(
     url =>
      !url.toString().includes('login') &&
      !url.toString().includes('signin'),
      { timeout: 120000 }
     );

    const url = this.page.url();
    console.log('Final URL', url);

    // if (url.includes('login') || url.includes('signin')) {
    //   throw new Error('Login failed, still on authentication page');
    // }

   
    
  }}
  async M365login(email: string, password: string , acc?: string): Promise<void> {

    await this.page.click(this.M365SignIn);
    if (await this.page.locator(this.emailInput).isVisible()){
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.nextBtn);
    await this.page.waitForLoadState('networkidle');

    if (acc === 'MSA') {
      //await this.page.pause();
      await this.page.waitForTimeout(2000); // Wait for potential redirects and page loads after email submission
      await this.page.keyboard.press('Escape', { delay: 100 });
      await this.page.waitForSelector('#idA_PWD_SwitchToCredPicker', { state: 'visible', timeout: 10000 });
      await this.page.locator('#idA_PWD_SwitchToCredPicker').click();
      await this.page.locator('#fui-CardHeader__header10').waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator('#fui-CardHeader__header10').click();
      await this.page.waitForLoadState('networkidle');
      const pwdentryLabel = this.page.locator('label[for = "passwordEntry"]');
      await pwdentryLabel.waitFor({ state: 'visible', timeout: 10000 });
      await pwdentryLabel.click();
      await pwdentryLabel.fill(password);

      const nextBtn = this.page.locator('[data-testid="primaryButton"]');
      await nextBtn.click();
      
      //await this.page.waitForLoadState('networkidle');

      const staySignedIn = this.page.locator('[data-testid="title"]');
      if (await staySignedIn.isVisible()) {
        await nextBtn.click();
        
    }

  }else {
 
    const passwordField = this.page.locator('#i0118');
    await passwordField.waitFor({ state: 'visible', timeout: 10000 });
 // Wait for potential redirects and page loads after email submission
    await passwordField.fill(password);
 
    await this.page.click(this.signInBtn);
    await this.page.waitForLoadState('networkidle'); // Wait for potential redirects and page loads after sign-in
      
    

    // CRITICAL: handle "Please enter your password again" re-prompt
    const reenterPrompt = this.page.locator("text=Please enter your password again").or(
                this.page.locator("text=password is incorrect")
    );
    const isReenter = await reenterPrompt.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
    if (isReenter) {
                console.warn('Password re-prompt detected, refilling password...');
                await passwordField.waitFor({ state: 'visible', timeout: 10000 });
                await passwordField.fill(password);

                await this.page.click(this.signInBtn);
                await this.page.waitForLoadState('networkidle');
                
            }

    const staySignedInPrompt = this.page.locator("text=Stay signed in");
     if (await staySignedInPrompt.isVisible()) {
      await this.page.click('#idSIButton9');
      //await this.page.waitForLoadState('networkidle');
    }
    
    //Final Validation

    const url = this.page.url();
    console.log('Final URL', url);

    if (url.includes('login') || url.includes('signin')) {
      throw new Error('Login failed, still on authentication page');
    }

  }
    
  }}}
  

  // async fillPassword(password: string): Promise<boolean> {
  //   try {
  //     await this.page.waitForSelector(this.passwordInput, { state: 'visible', timeout: 10000 });
  //     await this.page.fill(this.passwordInput, password); 
  //     return true;
  //   } catch (error) {
  //     console.error('Error filling password:', error);
  //     return false;
  //   }

  // }}