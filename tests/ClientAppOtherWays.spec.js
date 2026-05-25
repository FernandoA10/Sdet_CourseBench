const {test, expect} = require('@playwright/test');


test ('Browser Register/Login test', async ({page}) => {

    const emailConfirm = "fernandoanda11@gmail.com";
    const Loginbtn = page.locator('#login');
    const email = page.locator('#userEmail');
    const pass = page.locator('#userPassword');
    const producName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    await page.getByPlaceholder ("email@example.com").fill(email);
    await page.getByPlaceholder('enter your password').fill('6986.6986Fer');
    await page.getByRole('button', {name:"Login"}).click();
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body b").filter({hasText: "ZARA COAT 3"})
    .getByRole("button", {name: "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();



    await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        await page.getByRole('button', {name: "Checkout"}).click();

        await page.getByPlaceholder("Select Country").pressSequentially("Mex")

        await page.locator("[placeholder='Select Country']").pressSequentially('Me',{delay:150});
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i =0; i< optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();

            if(text === ' Mexico')
                {
                    await dropdown.locator("button").nth(i).click();
                    break;
                }
            }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailConfirm);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    

    for (let i = 0; i< await rows.count(); i++) 
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

