const { test, expect } = require("@playwright/test");
const { login } = require("../utils/login");

test.describe("Validate Hamburger Menu Options, Use of Filters and Adding and removing items from cart", () => {
  test("Login, First & Second MenuOption", async ({ page }) => {
    const menuContainer = page.locator("#menu_button_container");
    const menuOption1 = await page.getByRole("link", { name: "All Items" });
    const menuOption2 = await page.getByRole("link", { name: "About" });

    await login(page, "standard_user", "secret_sauce");
    await page.locator("dic. login_logo");
    console.log(await page.getByText("Swag Labs"));
    await menuContainer.isVisible();
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator("div.bm-menu").isVisible();
    await expect(menuOption1).toHaveText("All Items");
    await expect(menuOption2).toHaveText("About");
    await menuOption2.click();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("3rd Menu Option", async ({ page }) => {
    const menuContainer = page.locator("#menu_button_container");
    const menuOption3 = await page.getByRole("link", { name: "Logout" });

    await login(page, "standar_user", "secret_sauce");
    await page.getByRole("button", { name: "Open Menu" }).click();
    await expect(menuOption3).toHaveText("Logout");
    await menuOption3.click();
    await page.locator("dic. login_logo");
    console.log(await page.getByText("Swag Labs"));
  });

  test("Add & Remove an Item to Cart", async ({ page }) => {
    const addCartButtn = await page.locator("#add-to-cart-sauce-labs-backpack");
    const cartBttn = await page.locator("#shopping_cart_container");
    const product = await page.locator('[data-test="cart-list"]');
    const removeBtnn = await page.getByRole("button", { name: "Remove" });
    const backShopButnn = await page.getByRole("button", {
      name: "Continue Shopping",
    });

    await login(page, "standar_user", "secret_sauce");
    await page.locator("dic. login_logo");
    await expect(addCartButtn).toBeVisible();
    await addCartButtn.click();
    await expect(cartBttn).toBeVisible();
    await cartBttn.click();
    await expect(product).toBeVisible();

    /*Remove Product*/
    await expect(removeBtnn).toBeVisible();
    await removeBtnn.click();
    /*Back Shopping*/
    await expect(backShopButnn).toBeVisible();
    await backShopButnn.click();
  });

  test("Use of Filters", async ({ page }) => {
    const filterButtn = await page.getByRole("combobox");

    await login(page, "standar_user", "secret_sauce");
    await page.locator("dic. login_logo");
    await expect(filterButtn).toBeVisible();
    await filterButtn.click();
    await expect(page.locator(".product_sort_container option")).toHaveText([
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ]);

    const options = [
      { value: "az", text: "Name (A to Z)" },
      { value: "za", text: "Name (Z to A)" },
      { value: "lohi", text: "Price (low to high)" },
      { value: "hilo", text: "Price (high to low)" },
    ];

    for (const option of options) {
      await page.selectOption(".product_sort_container", option.value);

      await expect(page.locator(".product_sort_container")).toHaveValue(
        option.value,
      );
    }
  });

  test("Adding and removing items", async ({ page }) => {
    const items = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];
    const addItemsCartBtnns = [
      await page.locator("#add-to-cart-sauce-labs-backpack"),
      await page.locator("#add-to-cart-sauce-labs-bike-light"),
      await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt"),
      await page.locator("#add-to-cart-sauce-labs-fleece-jacket"),
      await page.locator("#add-to-cart-sauce-labs-onesie"),
      await page.locator(
        '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
      ),
    ];

    const removeItemsCartBtnns = [
      await page.locator('[data-test="remove-sauce-labs-backpack"]'),
      await page.locator("#remove-sauce-labs-bike-light"),
      await page.locator("#remove-sauce-labs-bolt-t-shirt:visible"),
      await page.locator("#remove-sauce-labs-onesie:visible"),
      await page.locator("#add-to-cart-sauce-labs-onesie"),
      await page.locator(
        '[data-test="remove-test.allthethings()-t-shirt-(red)"]',
      ),
    ];

    await login(page, "standar_user", "secret_sauce");
    console.log(await page.getByText("Swag Labs"));
    await page.locator('[data-test="inventory-list"]');
    await page.getByText(items);
    console.log(items);
    for (const button of addItemsCartBtnns) {
      await button.click();
    }
    await page.locator("span").filter({ hasText: "6" });
    for (const button of removeItemsCartBtnns) {
      await button.click();
    }
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  });
});
