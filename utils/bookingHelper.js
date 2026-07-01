async function createBooking(request) {
  const response = await request.post("/booking", {
    data: {
      firstname: "Fernando",
      lastname: "Anda",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-06-01",
        checkout: "2026-06-10",
      },
      additionalneeds: "Breakfast",
    },
  });

  return await response.json();
}

module.exports = { createBooking };
