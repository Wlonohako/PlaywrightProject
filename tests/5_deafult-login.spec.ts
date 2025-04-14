import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('DEAFULT_LOGIN', async () => {
    const browser = await chromium.launch({
        headless: true,
        slowMo: 500,
        timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto('https://www.kurier-kwiatowy.pl/');
    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();

    await page.getByRole('link', { name: 'Zaloguj' }).click();
    await page.getByRole('textbox', { name: 'E-mail(wymagane)' }).click();
    await page.getByRole('textbox', { name: 'E-mail(wymagane)' }).fill('cozaidiota2137@proton.me');
    await page.getByRole('textbox', { name: 'Hasło(wymagane)' }).click();
    await page.getByRole('textbox', { name: 'Hasło(wymagane)' }).fill('utwurzSlineHaslo1@');
    await page.getByRole('button', { name: 'zaloguj się »' }).click();

    browser.close();
});