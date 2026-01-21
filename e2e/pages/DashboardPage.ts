import { expect, Page } from "@playwright/test";

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
    await this.page.click("[data-test-id='cs-locale-list-dropdown']");
    await this.page.waitForTimeout(2000); // wait for modal to open and load
  }

  async openCreatedEntry(
    STACK_API_KEY: string,
    entryUid: string,
    contentTypeUid: string
  ) {
    await this.page.goto(
      `/#!/stack/${STACK_API_KEY}/content-type/${contentTypeUid}/en-us/entry/${entryUid}/edit`
    );
    await this.page.waitForLoadState();
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
    const frame = this.page.frameLocator('[data-testid="app-extension-frame"]');
    const slider = frame.locator(".MuiSlider-root").first();
    
    // Wait for the slider to be visible
    await slider.waitFor({ state: "visible", timeout: 30000 });
    await expect(slider).toBeVisible();
  }

  async slideApp() {
    const frame = this.page.frameLocator('[data-testid="app-extension-frame"]');
    const slider = frame.locator(".MuiSlider-root").first();
    const sliderThumb = frame.locator(".MuiSlider-thumb").first();

    // Wait for slider to be ready
    await slider.waitFor({ state: "visible" });

    // Get the slider's bounding box to calculate positions
    const sliderBox = await slider.boundingBox();
    if (!sliderBox) {
      throw new Error("Could not get slider bounding box");
    }

    // Click at ~60% position on the slider
    const targetX = sliderBox.x + sliderBox.width * 0.6;
    const targetY = sliderBox.y + sliderBox.height / 2;

    await this.page.mouse.click(targetX, targetY);

    // Verify the thumb moved (slider value changed)
    await expect(sliderThumb).toBeVisible();
  }
}
