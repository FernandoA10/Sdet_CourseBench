const {test, expect} = require('@playwright/test');
const { login } = require('../utils/login');


test.describe('Validate Hamburger Menu Options', () => {
    
test('Login & First MenuOption', async ({page}) =>
{

    const menuContainer = page.locator('#menu_button_container')
    const menuOption1 = await page.getByRole('link', { name: 'All Items' });
    
    await login (page, 'standard_user','secret_sauce');
    await page.locator('dic. login_logo');
    console.log(await page.getByText('Swag Labs'));
    await menuContainer.isVisible(); 
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('div.bm-menu').isVisible();
    await expect (menuOption1).toHaveText('All Items');

});

test('2nd Menu Option', async ({page}) => {

    const menuContainer = page.locator('#menu_button_container')
    const menuOption2 = await page.getByRole('link', { name: 'About' })

    await login (page, 'standard_user','secret_sauce');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect (menuOption2).toHaveText('About');
    await menuOption2.click();
    await expect(page).toHaveURL('https://saucelabs.com/');  
});

test ('3rd Menu Option', async ({page}) => {

    const menuContainer = page.locator('#menu_button_container')
    const menuOption3 = await page.getByRole('link', { name: 'Logout' })

    await login (page, 'standar_user', 'secret_sauce');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect (menuOption3).toHaveText('Logout');
    await menuOption3.click();
    await page.locator('dic. login_logo');
    console.log(await page.getByText('Swag Labs'));

});

test ('Add & Remove an Item to Cart', async ({page}) => {

    const addCartButtn = await page.locator('#add-to-cart-sauce-labs-backpack');
    const cartBttn = await page.locator('#shopping_cart_container');
    const product = await page.locator('[data-test="cart-list"]');
    const removeBtnn = await page.getByRole('button', { name: 'Remove' });
    const backShopButnn = await page.getByRole('button', { name: 'Continue Shopping' });


     await login (page, 'standar_user', 'secret_sauce');
     await page.locator('dic. login_logo');
     await expect (addCartButtn).toBeVisible();
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

test ('Use of Filters', async ({page}) => {

    const filterButtn = await page.getByRole('combobox');
   


    await login (page, 'standar_user', 'secret_sauce');
    await page.locator('dic. login_logo');
    await expect(filterButtn).toBeVisible();
    await filterButtn.click();
    await expect (page.locator('.product_sort_container option')).toHaveText(['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']);

    const options = [
    { value: 'az', text: 'Name (A to Z)' },
    { value: 'za', text: 'Name (Z to A)' },
    { value: 'lohi', text: 'Price (low to high)' },
    { value: 'hilo', text: 'Price (high to low)' }
];

    for (const option of options) {

    await page.selectOption(
    '.product_sort_container',
    option.value
  );

    await expect(
    page.locator('.product_sort_container')
    ).toHaveValue(option.value);

}
    



});



});
