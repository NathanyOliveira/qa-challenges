import { expect, test } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:5173/challenge-1')
    await expect(page).toHaveTitle('QA Challenges')
})

test("Successfully find astrological sign", async({page}) => {
    await page.getByPlaceholder("Enter your name").fill('Xuxa')
    await page.getByPlaceholder("dd-mm-yyyy").fill('27-03-1963')
    await page.getByRole('button', { name: 'Find Astrological Sign' }).click()
    await expect(page.getByText("Xuxa, your astrological sign is Aries")).toBeVisible()
}) 

test('Invalid date format', async({page}) =>{
    await page.getByPlaceholder("Enter your name").fill('Xuxa')
    await page.getByPlaceholder("dd-mm-yyyy").fill('27/03-1963')
    await page.getByRole('button', { name: 'Find Astrological Sign' }).click()
    await expect(page.getByText("Invalid date. Please use the format dd-mm-yyyy.")).toBeVisible()

})