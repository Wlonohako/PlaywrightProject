import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('NEGATIVE_BUY_FLOWERBOX_WITH_DEAFULT_VALUES_AND_LOGIN', async () => {
    const browser = await chromium.launch({
        headless: true,
        slowMo: 500,
        timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto('https://www.kurier-kwiatowy.pl/');
    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();

    await page.getByRole('link', { name: "Flowerbox" }).first().click();

    const ul = await page.locator('#products > ul').first();
    const numberOfLi = await ul.locator('li').count();

    console.log(`Found ${numberOfLi} li elements in ul`);

    const randomIndex = Math.floor(Math.random() * numberOfLi)

    console.log(`Random index: ${randomIndex}`);

    const li = ul.locator('li').nth(randomIndex);
    await li.locator('.photo > a').click();

    await page.waitForTimeout(10000);
    await page.locator('#datepicker').click();


    const tbody = await page.locator('tbody')

    await tbody.waitFor({ state: 'visible' });

    const numberOfRows = await tbody.locator('tr').count();

    console.log(`Found ${numberOfRows} rows in tbody`);

    for (let i = 0; i < 31; i++) {
        const randomRowIndex = Math.floor(Math.random() * numberOfRows);
        const tr = await tbody.locator('tr').nth(randomRowIndex)
        const numberOfColumns = await tr.locator('td').count();

        const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        const cellLocator = tr.locator('td').nth(randomColumnIndex);
        const isDisabled = await cellLocator.evaluate(element => {
            return element.classList.contains('ui-datepicker-unselectable')
        });

        console.log(`Checking cell at row ${randomRowIndex}, column ${randomColumnIndex}. Disabled: ${isDisabled}`);

        if (!isDisabled) {
            const hieroglify = await cellLocator.locator('a').textContent();
            await cellLocator.getByRole('link', { name: hieroglify! }).click();
            console.log(`Clicked on row ${randomRowIndex} and column ${randomColumnIndex}`);
            break;
        }
    }
    const deliveryHour = await page.$('#deliveryHour');
    if (deliveryHour) {
        const options = await page.$$eval('#deliveryHour option', options =>
            options.map(option => option.textContent?.trim())
        );

        const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
        const randomOptionText = options[randomIndex];
        console.log("option text", randomOptionText)

        await page.selectOption('#deliveryHour', {
            label: randomOptionText
        });
    }
    await page.locator('#deliveryName').fill('Jan Paweł')
    await page.locator('#deliveryCity').fill('Watykan')
    await page.$eval('#deliveryPostcode', (input: HTMLInputElement, value) => {
        input.value = '21377';
    });
    await page.locator('#deliveryStreet').fill('papieska')
    await page.locator('#deliveryHouseNumber').fill('69')
    await page.locator('#deliveryPhone').fill('213769694')

    await page.getByRole('button', { name: 'Do koszyka' }).click();
    await page.getByRole('button', { name: 'Zamów' }).click();
    await page.locator('#page').getByRole('link', { name: 'Zaloguj' }).click();

    await page.locator('#login').fill('sex123')
    await page.locator('#password').fill('alahakbar123')
    await page.getByRole('button', { name: 'zaloguj się »' }).click();
    await page.locator('h2').filter({ hasText: 'Błędny login lub hasło!' }).waitFor({ state: 'visible' });
    browser.close();
});