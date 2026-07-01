async function login(page, user__name, Pass) {
  await page.goto("https://www.saucedemo.com");

  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");

  await page.locator("#login-button").click();
}

module.exports = { login };
