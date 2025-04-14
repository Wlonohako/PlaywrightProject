import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('DEAFULT_LOGIN', async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500,
        timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto('https://www.kurier-kwiatowy.pl/');
    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();

    await page.getByRole('link', { name: 'Zaloguj' }).click();
    await page.getByRole('textbox', { name: 'E-mail(wymagane)' }).click();
    await page.getByRole('textbox', { name: 'E-mail(wymagane)' }).fill('sex123');
    await page.getByRole('textbox', { name: 'Hasło(wymagane)' }).click();
    await page.getByRole('textbox', { name: 'Hasło(wymagane)' }).fill('alahakbar123');
    await page.getByRole('button', { name: 'zaloguj się »' }).click();
    await page.locator('h2').filter({ hasText: 'Błędny login lub hasło!' }).waitFor({ state: 'visible' });

    browser.close();
});