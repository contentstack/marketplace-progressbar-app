import { Page, expect } from "@playwright/test";
require("dotenv").config();

export class Marketplace {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToMarketplace() {
    await this.page.goto(`/#!/marketplace`);
    await this.page.waitForLoadState();
  }

  async navigateToMarketplaceInstalledApps() {
    await this.page.goto(`/#!/marketplace/installed-apps?sort=name&order=asc`);
    await this.page.waitForLoadState();
  }

  async selectAppsTab() {
    await this.page.locator('[data-test-id="marketplace-apps"]').click();
    await expect(this.page).toHaveURL(
      `${process.env.ENV_URL}/#!/marketplace/apps`
    );
  }

  async searchProgressBarApp() {
    await this.page.locator('[data-test-id="cs-search-input-field"]').waitFor();
    await this.page.locator('[data-test-id="cs-search-input-field"]').click();
    await this.page
      .locator('[data-test-id="cs-search-input-field"]')
      .fill("Progress B");
  }

  async selectProgressBarApp() {
    await this.page.getByRole("heading", { name: "Progress Bar" }).waitFor();
    await this.page.getByRole("heading", { name: "Progress Bar" }).click();
  }

  async selectProgressBaAtInstalledApps() {
    await this.page.getByRole("cell", { name: "Progress Bar" }).waitFor();
    await this.page.getByRole("cell", { name: "Progress Bar" }).click();
  }

  async installApp(stackName: string) {
    await this.page
      .locator('[data-test-id="apps-progress-bar-modal-install-app"]')
      .waitFor();
    await this.page
      .locator('[data-test-id="apps-progress-bar-modal-install-app"]')
      .click();
    await this.page.getByText("Progress Bar Version 1").waitFor();
    await this.page.locator('[data-test-id="cs-select"]').waitFor();
    await this.page.locator('[data-test-id="cs-select"]').click();
    await this.page.getByRole("textbox", { name: "cs-select-aria" }).waitFor();
    await this.page
      .getByRole("textbox", { name: "cs-select-aria" })
      .fill("Progress B");
    await this.page.getByText(stackName, { exact: true }).click();
    await this.page.locator('[data-test-id="cs-checkbox"]').click();
    await this.page.getByTestId("modal-form-install-authorize").click();
  }

  async unInstallApp(appName: string) {
    await this.page
      .getByTestId("cs-modal")
      .getByText("Progress Bar Stack")
      .first()
      .waitFor();
    await this.page.locator('[data-test-id="cs-Icon"]').first().waitFor();
    await this.page.locator('[data-test-id="cs-Icon"]').first().click();
    await this.page.getByTestId("app-name-to-uninstall").waitFor();
    await this.page.getByTestId("app-name-to-uninstall").fill(appName);
    await this.page.getByTestId("modal-form-uninstall").waitFor();
    await this.page.getByTestId("modal-form-uninstall").click();
  }
}
