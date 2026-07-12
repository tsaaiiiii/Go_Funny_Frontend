import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5180',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // 啟動 dev server 供 E2E 測試使用
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5180',
    reuseExistingServer: !process.env.CI,
  },
})
