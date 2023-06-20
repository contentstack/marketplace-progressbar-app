import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#pw");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(
      'button:has-text("Log In"), button:has-text("LOGIN")'
    );
  }

  async visitLoginPage() {
    if (process.env.ENV_URL) {
      await this.page.goto(process.env.ENV_URL);
    }
  }

  async performLogin(email: string, password: string) {
    try {
      await this.emailInput.type(email);
      await this.passwordInput.type(password);
      const loginButton = await this.page.waitForSelector(
        'button:has-text("Log In")'
      );
      await loginButton.click();
      await this.page.waitForTimeout(2000);
      await this.page
        .context()
        .storageState({ path: "storageState.json" as string });
    } catch (e) {
      console.error(e);
    }
  }
}
