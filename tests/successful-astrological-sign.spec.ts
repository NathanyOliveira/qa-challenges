import { expect, test } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:5173/challenge-1')
    await expect(page).toHaveTitle('QA Challenges')
    
})



test("Successfully find astrological sign", async({page}) => {
    await page.getByPlaceholder("Enter your name").fill('batata')
    await page.getByPlaceholder("dd-mm-yyyy").fill('29-12-1990')
    await page.getByRole('button', { name: 'Find Astrological Sign' }).click()

}) 
