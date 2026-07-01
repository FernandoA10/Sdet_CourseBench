const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const schema = require('../../schemas/booking.schema.json');

test('Validate Booking Schema', async ({ request }) => {

  const response = await request.get('/booking/1');

  const body = await response.json();

  const ajv = new Ajv();

  const validate = ajv.compile(schema);

  expect(validate(body)).toBe(true);

});