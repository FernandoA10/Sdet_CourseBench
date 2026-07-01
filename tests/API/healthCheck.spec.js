const { test, expect } = require('@playwright/test');

test('Health Check', async ({ request }) => {

  const response = await request.get('/ping');

  expect(response.status()).toBe(201);

});