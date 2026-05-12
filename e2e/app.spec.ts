import { test, expect } from '@playwright/test';

test.describe('Text list app', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('adds a new item from the modal', async ({ page }) => {
        await page.getByRole('button', { name: 'ADD' }).first().click();

        await page.getByPlaceholder('Type the text here...').fill('Playwright item');

        await page.getByRole('button', { name: 'ADD' }).nth(1).click();

        await expect(page.getByText('Playwright item')).toBeVisible();
    });

    test('deletes a selected item', async ({ page }) => {
        await page.getByText('Item 1').click();

        await page.getByRole('button', { name: 'DELETE' }).click();

        await expect(page.getByText('Item 1')).not.toBeVisible();
    });

    test('undoes the last change', async ({ page }) => {
        await page.getByText('Item 4').dblclick();

        await expect(page.getByText('Item 4')).not.toBeVisible();

        await page.getByRole('button', { name: 'Undo last action' }).click();

        await expect(page.getByText('Item 4')).toBeVisible();
    });

    test('closes modal with cancel', async ({ page }) => {
        await page.getByRole('button', { name: 'ADD' }).first().click();

        await expect(page.getByPlaceholder('Type the text here...')).toBeVisible();

        await page.getByRole('button', { name: 'CANCEL' }).click();

        await expect(page.locator('.modalOverlay')).not.toHaveClass(/open/);
    });
});