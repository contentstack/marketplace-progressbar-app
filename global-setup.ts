import { chromium } from "@playwright/test";
import { LoginPage } from "./e2e/pages/LoginPage";
import { getAuthToken } from "./e2e/utils/helper";

const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, EMAIL, PASSWORD }: any =
  process.env;

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    httpCredentials: {
      username: BASIC_AUTH_USERNAME || "",
      password: BASIC_AUTH_PASSWORD || "",
    },
  });
  const loginPage: LoginPage = new LoginPage(page);
  await loginPage.visitLoginPage();
  await loginPage.performLogin(EMAIL, PASSWORD);
  await getAuthToken();
}

export default globalSetup;
