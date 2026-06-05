const { test, expect } = require('@playwright/test');
const { readCSV } = require('../../utils/csvReader');

let users;

test.beforeAll(async () => {
  users = await readCSV('./test-data/bookings.csv');
});

test('CSV Data Driven', async ({ request }) => {

  for (const user of users) {

    const response = await request.post('/booking', {
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-06-01',
          checkout: '2026-06-10'
        }
      }
    });

    expect(response.status()).toBe(200);

  }

});