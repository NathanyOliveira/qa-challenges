import { expect, test, type Page } from '@playwright/test';

test.describe('Challenge 1 - Astrological Sign', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/challenge-1');
    await expect(page).toHaveTitle('QA Challenges');
  });

  // Helper locators
  const getNameField = (page: Page) => page.getByLabel(/name/i);
  const getBirthdayField = (page: Page) => page.getByLabel(/birthday/i);
  const getSubmitButton = (page: Page) => page.getByRole('button', { name: /find astrological sign/i });

  // Reusable action helper
  async function submitForm(page: Page, name: string, birthday: string) {
    await getNameField(page).fill(name);
    await getBirthdayField(page).fill(birthday);
    await getSubmitButton(page).click();
  }

  test('Successfully displays Aries', async ({ page }) => {
    await submitForm(page, 'Xuxa', '27-03-1963');

    await expect(
      page.getByText('Xuxa, your astrological sign is Aries')
    ).toBeVisible();
  });

  test('Invalid date format', async ({ page }) => {
    await submitForm(page, 'Xuxa', '27/03-1963');

    await expect(
      page.getByText('Invalid date. Please use the format dd-mm-yyyy.')
    ).toBeVisible();
  });

  test('Button is disabled until both name and birthday are entered', async ({ page }) => {
    const button = getSubmitButton(page);

    await expect(button).toBeDisabled();

    await getNameField(page).fill('Xuxa');
    await expect(button).toBeDisabled();

    await getBirthdayField(page).fill('27-03-1963');
    await expect(button).toBeEnabled();
  });

});