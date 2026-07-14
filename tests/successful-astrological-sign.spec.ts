import { expect, test } from '@playwright/test';

test.describe('Challlenge 1 - Astrological Sign', () =>{

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:5173/challenge-1')
    await expect(page).toHaveTitle('QA Challenges')
})

test("Successfully find astrological sign", async({page}) => {
    await page.getByLabel("name").fill('Xuxa')
    await page.getByLabel("birthday").fill('27-03-1963')
    await page.getByRole('button', { name: 'Find Astrological Sign' }).click()
    await expect(page.getByText("Xuxa, your astrological sign is Aries")).toBeVisible()
}) 

test('Invalid date format', async({page}) =>{
    await page.getByLabel("name").fill('Xuxa') // Avoid using placeholders whenever possible.
    await page.getByLabel("birthday").fill('27/03-1963')
    await page.getByRole('button', { name: 'Find Astrological Sign' }).click()
    await expect(page.getByText("Invalid date. Please use the format dd-mm-yyyy.")).toBeVisible()
})

test('Button is disabled until both name and birthday are entered', async({page}) => {
   const button = page.getByRole('button', {
    name:  'Find Astrological Sign'
    })
    await expect(button).toBeDisabled();
    await page.getByLabel('name').fill('Xuxa');
    await expect(button).toBeDisabled();
    await page.getByLabel('birthday').fill('27-03-1963');
    await expect(button).toBeEnabled();

})

})