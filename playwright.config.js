// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ['html']
  ],

  use: {
    baseURL: 'https://restful-booker.herokuapp.com',

    browserName: 'chromium',
    headless: false,

    screenshot: 'on',
    trace: 'on'
  }

});