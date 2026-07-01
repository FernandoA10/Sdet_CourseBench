const { test, expect } = require('@playwright/test');

test('Get Booking', async ({ request }) => {

  const response = await request.get('/booking/1');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.firstname).toBeDefined();

});