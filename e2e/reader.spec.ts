import { test, expect } from '@playwright/test';

test.describe('chapter reader', () => {
	test('shows Chapter 1 heading', async ({ page }) => {
		await page.goto('/genesis/1');
		await expect(page.getByText('Chapter 1')).toBeVisible();
	});

	test('prev chip is disabled on the first chapter', async ({ page }) => {
		await page.goto('/genesis/1');
		await expect(page.getByText('Start')).toBeVisible();
		// The Start label is a div, not a link
		await expect(page.locator('.chip.disabled')).toBeVisible();
	});

	test('next chip shows the correct following chapter', async ({ page }) => {
		await page.goto('/genesis/1');
		await expect(page.getByRole('link', { name: /Genesis 2/ })).toBeVisible();
	});

	test('navigating via next chip updates the heading', async ({ page }) => {
		await page.goto('/genesis/1');
		await page.getByRole('link', { name: /Genesis 2/ }).click();
		await expect(page).toHaveURL('/genesis/2');
		await expect(page.getByText('Chapter 2')).toBeVisible();
	});

	test('prev chip is enabled after navigating past chapter 1', async ({ page }) => {
		await page.goto('/genesis/2');
		await expect(page.getByRole('link', { name: /Genesis 1/ })).toBeVisible();
	});

	test('next chip is disabled on the last chapter', async ({ page }) => {
		await page.goto('/genesis/50');
		await expect(page.getByText('End')).toBeVisible();
		await expect(page.locator('.chip.disabled').last()).toBeVisible();
	});

	test('chapter counter shows correct position', async ({ page }) => {
		await page.goto('/genesis/3');
		await expect(page.getByText('3 / 50')).toBeVisible();
	});

	test('Aa button is present', async ({ page }) => {
		await page.goto('/genesis/1');
		await expect(page.getByRole('button', { name: 'Cycle font size' })).toBeVisible();
	});

	test('works for a New Testament book', async ({ page }) => {
		await page.goto('/john/3');
		await expect(page.getByText('Chapter 3')).toBeVisible();
		await expect(page.getByText('3 / 21')).toBeVisible();
	});
});
