import { test, expect } from '@playwright/test';

test.describe('font size', () => {
	test('default is sm (18px)', async ({ page }) => {
		await page.goto('/genesis/1');
		await expect(page.locator('.reader')).toHaveCSS('font-size', '18px');
	});

	test('Aa button cycles sm → md → lg → sm', async ({ page }) => {
		await page.goto('/genesis/1');
		const aaBtn = page.getByRole('button', { name: 'Cycle font size' });
		const reader = page.locator('.reader');

		await aaBtn.click();
		await expect(reader).toHaveCSS('font-size', '22px');
		await aaBtn.click();
		await expect(reader).toHaveCSS('font-size', '26px');
		await aaBtn.click();
		await expect(reader).toHaveCSS('font-size', '18px');
	});

	test('persists across page reload', async ({ page }) => {
		await page.goto('/genesis/1');
		await page.getByRole('button', { name: 'Cycle font size' }).click();
		await expect(page.locator('.reader')).toHaveCSS('font-size', '22px');

		await page.reload();
		await expect(page.locator('.reader')).toHaveCSS('font-size', '22px');
	});

	test('persists when navigating to a different chapter', async ({ page }) => {
		await page.goto('/genesis/1');
		await page.getByRole('button', { name: 'Cycle font size' }).click();

		await page.goto('/genesis/2');
		await expect(page.locator('.reader')).toHaveCSS('font-size', '22px');
	});

	test('persists when navigating to a different book', async ({ page }) => {
		await page.goto('/genesis/1');
		await page.getByRole('button', { name: 'Cycle font size' }).click();

		await page.goto('/john/1');
		await expect(page.locator('.reader')).toHaveCSS('font-size', '22px');
	});
});
