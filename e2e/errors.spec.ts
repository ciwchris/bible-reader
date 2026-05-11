import { test, expect } from '@playwright/test';

test.describe('error routes', () => {
	test('unknown book slug shows not-found message and back link', async ({ page }) => {
		await page.goto('/not-a-book');
		await expect(page.getByText('Book not found.')).toBeVisible();
		await expect(page.getByRole('link', { name: /The Bible/ })).toBeVisible();
	});

	test('unknown book in reader URL shows error', async ({ page }) => {
		await page.goto('/not-a-book/1');
		await expect(page.getByText(/Book not found/i)).toBeVisible();
		await expect(page.locator('.reader')).not.toBeVisible();
	});

	test('out-of-range chapter shows error', async ({ page }) => {
		await page.goto('/genesis/999');
		await expect(page.getByText(/Chapter not found/i)).toBeVisible();
		await expect(page.locator('.reader')).not.toBeVisible();
	});

	test('chapter zero shows error', async ({ page }) => {
		await page.goto('/genesis/0');
		await expect(page.getByText(/Chapter not found/i)).toBeVisible();
	});

	test('unknown book back link returns to home', async ({ page }) => {
		await page.goto('/not-a-book');
		await page.getByRole('link', { name: /The Bible/ }).click();
		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: 'The Bible' })).toBeVisible();
	});
});
