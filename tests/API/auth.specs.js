const { test, expect } = require('@playwright/test');

test('Generate Token', async ({ request }) => {

  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBeTruthy();

});