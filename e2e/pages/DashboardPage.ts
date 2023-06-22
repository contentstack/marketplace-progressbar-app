import { Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToDashboard(stackApiKey: string) {
    await this.page.goto(`/#!/stack/${stackApiKey}/dashboard`);
    await this.page.waitForLoadState();
  }

  async selectContentType() {
    await this.page
      .locator('[data-test-id="cs-new-entry-all-entry"]')
      .waitFor();
    await this.page.locator('[data-test-id="cs-new-entry-all-entry"]').click();
  }

  async hoverSlydeApp() {
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator(".MuiSlider-rail")
      .waitFor({ state: "visible" });
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator(".MuiSlider-rail")
      .hover();
  }

  async checksApp() {
    await this.selectContentType();
    await this.hoverSlydeApp();
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator("span")
      .filter({ hasText: "10" })
      .first()
      .isVisible();
  }

  async slideApp() {
    await this.selectContentType();
    await this.hoverSlydeApp();
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator(".MuiSlider-rail")
      .click();
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator("span")
      .filter({ hasText: "62" })
      .first()
      .isVisible();
  }
}
