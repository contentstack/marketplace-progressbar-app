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

async reachEntrySection() {
  await this.page.locator("a >> [name='Entries']").waitFor();
  await this.page.locator("a >> [name='Entries']").click();
  await this.page.click("[name='AddPlus']");
  await this.page.waitForTimeout(2000);// wait for modal to open and load
}

  async selectContentType() {
   const locateContentType =  await this.page.locator('[data-test-id="table-body-row_0"]')
   await locateContentType.click();
    await this.page.locator('[name="Proceed"]').click();
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

  async validateAppLoadedState() {
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator("span")
      .filter({ hasText: "10" })
      .first()
      .isVisible();
  }

  async slideApp() {
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
