/* eslint-disable no-loop-func */
import { expect, test } from "@playwright/test";
import app from "../fixtures/app.json";
import stack from "../fixtures/stack.json";
import { DashboardPage } from "../pages/DashboardPage";
import { Marketplace } from "../pages/marketplace/marketplace.page";
import { createStack } from "../utils/helper";

test.describe.serial("Progress Bar App Flow", () => {
  const jsonFile = require("jsonfile");
  let authToken: string;
  let stackData: any;

  test.beforeAll(async () => {
    const file = "data.json";
    const token = jsonFile.readFileSync(file);
    authToken = token.authToken;
    try {
      if (authToken) {
        await createStack(authToken, stack.name);
      }
    } catch (error: any) {
      return error?.data?.errors;
    }
  });

  test.describe.serial("Install Progress Bar App", () => {
    let marketplace: Marketplace;

    test.use({ storageState: "storageState.json" });
    test.beforeEach(async ({ page }) => {
      marketplace = new Marketplace(page);
      await marketplace.navigateToMarketplace();
    });

    test("Installation", async ({ page }) => {
      await marketplace.selectAppsTab();
      await marketplace.searchProgressBarApp();
      await marketplace.selectProgressBarApp();
      await marketplace.installApp(stack.name);
    });
  });

  test.describe.serial("Create Content Type & Entry", () => {
    let dashboard: DashboardPage;

    test.use({ storageState: "storageState.json" });
    test.beforeEach(async ({ page }) => {
      dashboard = new DashboardPage(page);
      await dashboard.navigateToDashboard(stackData.stack.api_key);
    });

    test("Create Content Type", async ({ page }) => {
      await dashboard.createContentType();
    });

    test("Create Content Entry", async ({ page }) => {
      await dashboard.createEntry();
    });
  });

  test.describe.serial("Remove installation & stack", () => {
    let dashboard: DashboardPage;
    let marketplace: Marketplace;

    test.use({ storageState: "storageState.json" });
    test.beforeEach(async ({ page }) => {
      dashboard = new DashboardPage(page);
      marketplace = new Marketplace(page);
    });

    test("Should uninstall Progress Bar App", async () => {
      await marketplace.navigateToMarketplaceInstalledApps();
      await marketplace.searchProgressBarApp();
      await marketplace.selectProgressBarApp();
      await marketplace.unInstallApp(app.name);
    });

    test("Should delete the stack", async () => {
      await dashboard.navigateToDashboard(stackData.stack.api_key);
    });
  });
});
