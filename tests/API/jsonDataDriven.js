const { test, expect } = require('@playwright/test');
const bookings = require('../../test-data/bookings.json');

for (const booking of bookings) {

  test(`Create Booking ${booking.firstname}`, async ({ request }) => {

    const response = await request.post('/booking', {
      data: {
        ...booking,
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-06-01',
          checkout: '2026-06-10'
        }
      }
    });

    expect(response.status()).toBe(200);

  });

}