/* eslint-disable no-loop-func */
import { expect, test } from "@playwright/test";
import app from "../fixtures/app.json";
import stack from "../fixtures/stack.json";
import { DashboardPage } from "../pages/DashboardPage";
import {
  createContentType,
  createEntry,
  installApp,
  uninstallApp,
} from "../utils/helper";

const { STACK_API_KEY }: any = process.env;

test.describe("Progress Bar App e2e", () => {
  const jsonFile = require("jsonfile");
  let authToken: string;
  let dashboard: DashboardPage;
  const stackApikey = STACK_API_KEY;
  let installId: string;

  test.beforeAll(async () => {
    const file = "data.json";
    const token = jsonFile.readFileSync(file);
    authToken = token.authToken;
    try {
      if (authToken) {
        const installResponse: any = await installApp(authToken);
        installId = installResponse.data.data.installation_uid;
        const uidContentType = await createContentType(authToken);
        await createEntry(authToken, uidContentType);
      }
    } catch (error: any) {
      return error?.data?.errors;
    }
  });
  test.use({ storageState: "storageState.json" });
  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.navigateToDashboard(stackApikey);
    await page.getByRole("link", { name: "Entries" }).waitFor();
    await page.getByRole("link", { name: "Entries" }).click();
  });

  test("Assert that App is displaying", async ({ page }) => {
    await dashboard.checksApp();
  });

  test("Get score by sliding the App", async ({ page }) => {
    await dashboard.slideApp();
  });

  test.afterAll(async () => {
    try {
      await uninstallApp(authToken, installId);
    } catch (error: any) {
      return error?.data?.errors;
    }
  });
});
