/* eslint-disable no-loop-func */
import { chromium,test } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import {
  deleteContentType,
  installApp,
  uninstallApp,
  createApp,
  updateApp,
  createContentType,
  createEntry,
  getExtensionFieldUid,
  getInstalledApp,
  deleteApp,
} from "../utils/helper";

import jsonFile from "jsonfile";
const { STACK_API_KEY }: any = process.env;

let savedCredentials: any = {};
let authToken: string;
let dashboard: DashboardPage;
const file = "data.json";

test.beforeAll(async () => {
  const token = jsonFile.readFileSync(file);
  authToken = token.authToken;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  dashboard = new DashboardPage(page);
  try {
    if (authToken) {
      const appId: string = await createApp(authToken);
      const { name } = await updateApp(authToken, appId);
      const installationId: string = await installApp(authToken, appId, STACK_API_KEY);
      const extUID = await getExtensionFieldUid(authToken, STACK_API_KEY); // gets extension field uid
      savedCredentials['appName'] = name;
      const contentTypeResp = await createContentType(authToken, STACK_API_KEY,extUID);
      savedCredentials['contentTypeUID'] = contentTypeResp.content_type.uid;
      if (contentTypeResp.notice === 'Content Type created successfully.') {
        const entryResp = await createEntry(authToken, contentTypeResp.content_type.uid,STACK_API_KEY);
        savedCredentials['entryUid'] = entryResp;
        savedCredentials['appUID'] = appId;
        savedCredentials['installationId'] = installationId;
    }
  }
  } catch (error: any) {
    return error?.data?.errors;
  }
});
test.describe('Progress Bar App testing', () => {
  test("create entry and content type", async () => {
    await dashboard.navigateToDashboard(STACK_API_KEY);
    await dashboard.reachEntrySection();
    await dashboard.selectContentType();
  });
  test("validate app is loaded successfully", async () => {
    await dashboard.validateAppLoadedState();
  });
  test("validate app progress bar is working", async () => {
    await dashboard.slideApp();
  });
});

test.afterAll(async () => {
  try {
    const installations = await getInstalledApp(authToken, savedCredentials.appUID);
    if (installations.data.length) {
      installations.data[0].uid && (await uninstallApp(authToken, installations.data[0].uid));
    }
    await deleteApp(authToken, savedCredentials.appUID);
    await deleteContentType(authToken, savedCredentials.contentTypeUID);
  } catch (error: any) {
    return error?.data?.errors;
  }
});
