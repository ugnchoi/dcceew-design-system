import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for AppButton.
 * These navigate to Storybook story URLs and capture screenshots.
 */

test.describe('AppButton visual regression', () => {
  test('default variant matches snapshot', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-appbutton--default&viewMode=story',
    );
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'app-button-default.png',
    );
  });

  test('all variants match snapshot', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-appbutton--variants&viewMode=story',
    );
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'app-button-variants.png',
    );
  });

  test('disabled state matches snapshot', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-appbutton--disabled&viewMode=story',
    );
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'app-button-disabled.png',
    );
  });

  test('loading state matches snapshot', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-appbutton--loading&viewMode=story',
    );
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'app-button-loading.png',
    );
  });
});
