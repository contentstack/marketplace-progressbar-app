import { expect, Page } from "@playwright/test";
import { elements } from "../elements/progress-bar.element";

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToDashboard(stackApiKey: string) {
    await this.page.goto(`/#!/stack/${stackApiKey}/dashboard`);
    await this.page.waitForLoadState();
  }

  async deleteStack() {
    await this.page.getByRole("link", { name: "Settings" }).waitFor();
    await this.page.getByRole("link", { name: "Settings" }).click();
    await expect(this.page).toHaveURL(/.*settings/);
    await this.page.locator('[data-test-id="cs-delete-stack"]').waitFor();
    await this.page.locator('[data-test-id="cs-delete-stack"]').click();
    await this.page.locator('[data-test-id="cs-stack-delete"]').waitFor();
    await this.page.locator('[data-test-id="cs-stack-delete"]').click();
    await expect(this.page).toHaveURL(/.*stacks/);
    await this.page
      .getByText("Stack deleted successfully!")
      .waitFor({ state: "visible" });
  }

  async createContentType() {
    await this.page.getByRole("link", { name: "Content-models" }).waitFor();
    await this.page.getByRole("link", { name: "Content-models" }).click();
    await this.page.locator('[data-test-id="cs-cb-new-ct"]').waitFor();
    await this.page.locator('[data-test-id="cs-cb-new-ct"]').click();
    await this.page.getByText("Create New").waitFor();
    await this.page.getByText("Create New").click();
    await this.page.getByPlaceholder("Enter content type name").waitFor();
    await this.page
      .getByPlaceholder("Enter content type name")
      .fill("Progress content");
    await this.page.locator('[data-test-id="cs-cb-edit-ct-details"]').click();
    await this.page.getByText("Content Type created successfully.").waitFor();
    await this.page
      .locator('[data-test-id="cs-field-type-selector"] div')
      .first()
      .waitFor();
    await this.page
      .locator('[data-test-id="cs-field-type-selector"] div')
      .first()
      .click();
    await this.page.getByText("Custom").waitFor();
    await this.page.getByText("Custom").click();
    await this.page
      .locator('[data-test-id="cs-tabs"]')
      .getByText("Please select an extension")
      .waitFor();
    await this.page.getByText("Choose an Extension/App").waitFor();
    await this.page.getByText("Choose an Extension/App").click();
    await this.page.getByText("Progress Bar", { exact: true }).waitFor();
    await this.page.getByText("Progress Bar", { exact: true }).click();
    await this.page
      .locator('[data-test-id="cs-new-entry-single-proceed"]')
      .waitFor();
    await this.page
      .locator('[data-test-id="cs-new-entry-single-proceed"]')
      .click();
    await this.page
      .getByText("Progress Bar")
      .first()
      .waitFor({ state: "visible" });
    await this.page.locator('[data-test-id="cs-ct-save-close"]').click();
    await this.page.getByText("Content Type updated successfully.").waitFor();
  }

  async createEntry() {
    await this.page
      .getByRole("link", { name: "Entries", exact: true })
      .waitFor();
    await this.page.getByRole("link", { name: "Entries", exact: true }).click();
    await this.page
      .locator('[data-test-id="cs-new-entry-all-entry"]')
      .waitFor();
    await this.page.locator('[data-test-id="cs-new-entry-all-entry"]').click();
    await this.page.locator('#custom div').nth(1).waitFor({state: 'visible'});
    // await this.page
    //   .locator('[data-test-id="cs-new-entry-single-proceed"]')
    //   .click();
    await this.page
      .locator('[data-test-id="cs-skeleton-tile"]')
      .waitFor({ state: "visible" });
    await this.page
      .locator('[data-test-id="cs-skeleton-tile"]')
      .waitFor({ state: "hidden" });
    await this.page.getByTestId("custom").getByText("Custom").waitFor();
    await this.page
      .frameLocator('[data-testid="app-extension-frame"]')
      .locator("span")
      .filter({ hasText: "10" })
      .first()
      .isVisible();
    await this.page
      .locator('[data-test-id="cs-entry-not-locked-and-localized-save"]')
      .waitFor();
    await this.page
      .locator('[data-test-id="cs-entry-not-locked-and-localized-save"]')
      .click();
    await this.page.getByText("Entry created successfully.").waitFor();
  }
}
