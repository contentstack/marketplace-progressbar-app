import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
require("dotenv").config();

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  globalTeardown: require.resolve("./global-teardown"),
  testDir: "./e2e/tests",
  timeout: 20 * 10000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "always" }]],
  use: {
    storageState: "storageState.json",
    actionTimeout: 0,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1920, height: 720 },
    trace: "retain-on-failure",
    baseURL: process.env.ENV_URL,
    launchOptions: {
      logger: {
        isEnabled: () => {
          return false;
        },
        log: (name, severity, message, args) =>
          console.log(`${name}: ${message}`),
      },
    },
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
};

export default config;
