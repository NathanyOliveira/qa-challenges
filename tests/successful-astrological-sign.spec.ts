import { expect, test, type Page } from "@playwright/test";

const TEST_NAME = "TestName";

async function submitForm(page: Page, name: string, birthday: string) {
  await page.getByLabel("name").fill(name);
  await page.getByLabel("birthday").fill(birthday);
  await page.getByRole("button", { name: "Find Astrological Sign" }).click();
}

function getSubmitButton(page: Page) {
  return page.getByRole("button", {
    name: "Find Astrological Sign",
  });
}

test.describe("Challenge 1 - Astrological Sign", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/challenge-1");
    await expect(page).toHaveTitle("QA Challenges");
  });

  test("User can find astrological sign with valid birthday", async ({
    page,
  }) => {
    await submitForm(page, TEST_NAME, "27-03-1963");

    await expect(
      page.getByText(`${TEST_NAME}, your astrological sign is Aries`),
    ).toBeVisible();
  });

  test("Button is disabled until both name and birthday are entered", async ({
    page,
  }) => {
    const button = getSubmitButton(page);

    await expect(button).toBeDisabled();

    await page.getByLabel("name").fill(TEST_NAME);
    await expect(button).toBeDisabled();

    await page.getByLabel("birthday").fill("27-03-1963");
    await expect(button).toBeEnabled();
  });

  test("Button becomes disabled when a field is cleared", async ({ page }) => {
    const button = getSubmitButton(page);

    await page.getByLabel("name").fill(TEST_NAME);
    await page.getByLabel("birthday").fill("27-03-1963");

    await expect(button).toBeEnabled();

    await page.getByLabel("birthday").clear();

    await expect(button).toBeDisabled();
  });

  test("User sees error when birthday format is invalid", async ({ page }) => {
    await submitForm(page, TEST_NAME, "27/03-1963");

    await expect(
      page.getByText("Invalid date. Please use the format dd-mm-yyyy."),
    ).toBeVisible();
  });

  test("User sees error when birthday is not a valid date", async ({
    page,
  }) => {
    await submitForm(page, TEST_NAME, "31-02-2000");

    await expect(
      page.getByText("Invalid date. Please use the format dd-mm-yyyy."),
    ).toBeVisible();
  });

  test("Leap year date is accepted", async ({ page }) => {
    await submitForm(page, TEST_NAME, "29-02-2000");

    await expect(
      page.getByText(`${TEST_NAME}, your astrological sign is Pisces`),
    ).toBeVisible();
  });

  test("Non leap year February 29 is rejected", async ({ page }) => {
    await submitForm(page, TEST_NAME, "29-02-2001");

    await expect(
      page.getByText("Invalid date. Please use the format dd-mm-yyyy."),
    ).toBeVisible();
  });

  test.describe("Zodiac boundary dates", () => {
    const zodiacCases = [
      ["20-03-2000", "Pisces"],
      ["21-03-2000", "Aries"],

      ["19-04-2000", "Aries"],
      ["20-04-2000", "Taurus"],

      ["20-05-2000", "Taurus"],
      ["21-05-2000", "Gemini"],

      ["20-06-2000", "Gemini"],
      ["21-06-2000", "Cancer"],

      ["22-07-2000", "Cancer"],
      ["23-07-2000", "Leo"],

      ["22-08-2000", "Leo"],
      ["23-08-2000", "Virgo"],

      ["22-09-2000", "Virgo"],
      ["23-09-2000", "Libra"],

      ["22-10-2000", "Libra"],
      ["23-10-2000", "Scorpio"],

      ["21-11-2000", "Scorpio"],
      ["22-11-2000", "Sagittarius"],

      ["21-12-2000", "Sagittarius"],
      ["22-12-2000", "Capricorn"],

      ["19-01-2000", "Capricorn"],
      ["20-01-2000", "Aquarius"],

      ["18-02-2000", "Aquarius"],
      ["19-02-2000", "Pisces"],
    ] as const;

    for (const [birthday, sign] of zodiacCases) {
      test(`${birthday} returns ${sign}`, async ({ page }) => {
        await submitForm(page, TEST_NAME, birthday);

        await expect(
          page.getByText(`${TEST_NAME}, your astrological sign is ${sign}`),
        ).toBeVisible();
      });
    }
  });
});
