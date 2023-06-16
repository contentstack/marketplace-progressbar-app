import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./e2e/pages/LoginPage";
import { getAuthToken } from "./e2e/utils/helper";

const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD }: any = process.env;

async function globalSetup() {
  let loginPage: LoginPage;
  const browser = await chromium.launch();
  const page = await browser.newPage({
    httpCredentials: {
      username: process.env.BASIC_AUTH_USERNAME || "",
      password: process.env.BASIC_AUTH_PASSWORD || "",
    },
  });
  loginPage = new LoginPage(page);
  await loginPage.visitLoginPage();
  await loginPage.performLogin(BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD);
  await getAuthToken();
}

export default globalSetup;
