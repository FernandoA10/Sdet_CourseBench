// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});

/**
 * @see https://playwright.dev/docs/test-configuration

 */
const config = ({
  testDir: './tests',
  timeout: 30 *1000,
  expect:{
      timeout: 5000,
  },

  reporter : 'html',

  use: {
      browserName: 'chromium',
      headless : false,
      screenshot: 'on',
      trace: 'on'
      
  },

});

module.exports = config
  