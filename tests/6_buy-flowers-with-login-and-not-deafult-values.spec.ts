import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('BUY_FLOWERS_WITH_LOGIN_AND_NOT_DEAFULT_VALUES', async () => {
    const browser = await chromium.launch({
        headless: true,
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
    const flowerSizeExist = await page.isVisible('.radioWrap > input[type="radio"]');
    console.log("flowerSizeExist", flowerSizeExist)
    if (flowerSizeExist) {

        const flowerSize = await page.locator('.radioWrap > input[type="radio"]').count();
        const randomFlowerSizeIndex = Math.floor(Math.random() * flowerSize);

        await page.locator('.radioWrap > input[type="radio"]').nth(randomFlowerSizeIndex).click();
    }
    const flowerNumberExist = await page.isVisible('.quantityInput > input[type="text"]');
    if (flowerNumberExist) {
        const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        console.log("randomNumber", randomNumber)
        await page.locator('.quantityInput > input[type="text"]').fill(randomNumber.toString());
    }
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

    await page.locator('#deliveryFlowerCard').fill('JP2GMD');
    await page.locator('#deliveryMessage').fill('JP2GMD');

    await page.getByText('Dodaj upominek').click();

    const numberOfItems = await page.locator('.extensionsList >.extItem').count();
    console.log(`Found ${numberOfItems} items in the list`);

    const randomItemForNumber = Math.floor(Math.random() * numberOfItems);
    console.log(`Random item for number: ${randomItemForNumber}`);
    for (let i = 0; i < randomItemForNumber; i++) {
        const randomItemIndex = Math.floor(Math.random() * numberOfItems);
        console.log(`Random item index: ${randomItemIndex}`);
        const randomItem = await page.locator('.extensionsList > .extItem').nth(randomItemIndex);
        const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        console.log(`Random number: ${randomNumber}`);
        await randomItem.locator('.iqInput').click();
        await randomItem.locator('.iqInput').fill(randomNumber.toString());
    }

    await page.getByText('Ok', { exact: true }).click();

    await page.locator('input[type="submit"][value="Do koszyka"]').click();
    await page.getByRole('button', { name: 'Zamów' }).click();
    await page.locator('#page').getByRole('link', { name: 'Zaloguj' }).click();

    await page.locator('#login').fill('cozaidiota2137@proton.me')
    await page.locator('#password').fill('utwurzSlineHaslo1@')
    await page.getByRole('button', { name: 'zaloguj się »' }).click();

    browser.close();
});