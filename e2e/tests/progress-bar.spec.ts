/* eslint-disable no-loop-func */
import { test } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import {
  deleteContentType,
  deleteEntry,
  createContentTypeAndEntry,
  installApp,
  uninstallApp,
} from "../utils/helper";

const jsonFile = require("jsonfile");
const { STACK_API_KEY }: any = process.env;

let authToken: string;
let dashboard: DashboardPage;
const stackApikey = STACK_API_KEY;
let installId: string;
const file = "data.json";

test.beforeAll(async () => {
  const token = jsonFile.readFileSync(file);
  authToken = token.authToken;
  try {
    if (authToken) {
      installId = await installApp(authToken);
      createContentTypeAndEntry(authToken);
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
    const data = jsonFile.readFileSync(file);
    const uidContentType = data.contentTypeUid;
    const entryId = data.entryId;
    await uninstallApp(authToken, installId);
    await deleteEntry(authToken, uidContentType, entryId);
    await deleteContentType(authToken, uidContentType);
  } catch (error: any) {
    return error?.data?.errors;
  }
});
