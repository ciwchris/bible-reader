import { test, expect } from '@playwright/test';

const themeEl = (page: import('@playwright/test').Page) => page.locator('[data-theme]');

test.describe('theme toggle', () => {
	test('default theme is Ivory', async ({ page }) => {
		await page.goto('/');
		await expect(themeEl(page)).toHaveAttribute('data-theme', 'ivory');
	});

	test('toggle switches to Slate', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await expect(themeEl(page)).toHaveAttribute('data-theme', 'slate');
	});

	test('Slate theme persists on reload', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await expect(themeEl(page)).toHaveAttribute('data-theme', 'slate');
		await page.reload();
		await expect(themeEl(page)).toHaveAttribute('data-theme', 'slate');
	});

	test('toggling back restores Ivory', async ({ page }) => {
		await page.goto('/');
		const btn = page.getByRole('button', { name: 'Toggle theme' });
		await btn.click(); // → Slate
		await btn.click(); // → Ivory
		await expect(themeEl(page)).toHaveAttribute('data-theme', 'ivory');
	});
});
