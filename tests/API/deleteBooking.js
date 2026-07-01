const { test, expect } = require('@playwright/test');
const { getToken } = require('../../utils/authHelper');
const { createBooking } = require('../../utils/bookingHelper');

test('Delete Booking', async ({ request }) => {

  const booking = await createBooking(request);

  const bookingId = booking.bookingid;

  const token = await getToken(request);

  const response = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    }
  });

  expect(response.status()).toBe(201);

});