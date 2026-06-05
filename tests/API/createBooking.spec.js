const { test, expect } = require('@playwright/test');

test('Create Booking', async ({ request }) => {

  const response = await request.post('/booking', {
    data: {
      firstname: 'Fernando',
      lastname: 'Anda',
      totalprice: 500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-10'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.bookingid).toBeDefined();

});