import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const config: PlaywrightTestConfig = {
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  testDir: "./e2e/tests",
  timeout: 5 * 10000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    storageState: "storageState.json",
    actionTimeout: 0,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1300, height: 720 },
    trace: "retain-on-failure",
    baseURL: process.env.ENV_URL,
    launchOptions: {
      logger: {
        isEnabled: () => false,
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
