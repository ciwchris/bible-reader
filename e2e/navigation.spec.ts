import { test, expect } from '@playwright/test';

test.describe('drill-in navigation', () => {
	test('homepage shows The Bible heading with OT and NT sections', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'The Bible' })).toBeVisible();
		await expect(page.getByText('Old Testament')).toBeVisible();
		await expect(page.getByText('New Testament')).toBeVisible();
	});

	test('all 66 books are listed', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('a.row')).toHaveCount(66);
	});

	test('clicking a book navigates to its chapter grid', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: /Genesis/ }).first().click();
		await expect(page).toHaveURL('/genesis');
		await expect(page.getByRole('heading', { name: 'Genesis' })).toBeVisible();
		await expect(page.getByText('50 chapters')).toBeVisible();
		await expect(page.getByText('Chapter', { exact: true })).toBeVisible();
	});

	test('chapter grid shows the correct number of tiles', async ({ page }) => {
		await page.goto('/genesis');
		const tiles = page.locator('a[href^="/genesis/"]');
		await expect(tiles).toHaveCount(50);
	});

	test('clicking a chapter navigates to the reader', async ({ page }) => {
		await page.goto('/genesis');
		await page.getByRole('link', { name: '1', exact: true }).first().click();
		await expect(page).toHaveURL('/genesis/1');
		await expect(page.getByText('Chapter 1')).toBeVisible();
	});

	test('back link from chapter grid returns to books list', async ({ page }) => {
		await page.goto('/genesis');
		await page.getByRole('link', { name: 'The Bible' }).click();
		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: 'The Bible' })).toBeVisible();
	});

	test('back link from reader returns to chapter grid', async ({ page }) => {
		await page.goto('/genesis/1');
		await page.getByRole('link', { name: 'Genesis', exact: true }).click();
		await expect(page).toHaveURL('/genesis');
		await expect(page.getByRole('heading', { name: 'Genesis' })).toBeVisible();
	});
});
