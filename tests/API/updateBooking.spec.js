const { test, expect } = require('@playwright/test');
const { getToken } = require('../../utils/authHelper');
const { createBooking } = require('../../utils/bookingHelper');

test('Update Booking', async ({ request }) => {

  const booking = await createBooking(request);

  const bookingId = booking.bookingid;

  const token = await getToken(request);

  const response = await request.patch(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: 'Updated Fernando'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.firstname).toBe('Updated Fernando');

});