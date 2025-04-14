import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('NEGATIVE_BUY_FLOWERS', async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500,
        timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto('https://www.kurier-kwiatowy.pl/');
    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();

    const ul = await page.locator('#products > ul').first();
    const numberOfLi = await ul.locator('li').count();

    console.log(`Found ${numberOfLi} li elements in ul`);

    const randomIndex = Math.floor(Math.random() * numberOfLi)

    console.log(`Random index: ${randomIndex}`);

    const li = ul.locator('li').nth(randomIndex);
    await li.locator('.photo > a').click();
    await page.waitForTimeout(10000);

    await page.getByRole('button', { name: 'Do koszyka' }).click();

    const inputIds = ['#datepicker', '#deliveryHour', '#deliveryName', '#deliveryCity', '#deliveryPostcode', '#deliveryStreet', '#deliveryHouseNumber', '#deliveryPhone'];

    for (const inputId of inputIds) {
        const input = await page.$(inputId);

        if (!input) {
            continue;
        }
        const classList = await input.getAttribute('class');
        expect(classList).toContain('warning-required');

    }

    browser.close();
});