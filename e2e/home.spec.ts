import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('トップページが正しく表示される', async ({ page }) => {
    // トップページにアクセス
    await page.goto('/');

    // ページタイトルに "Create Next App" が含まれることを確認
    await expect(page).toHaveTitle(/Create Next App/);

    // メインの見出しが表示されることを確認
    const heading = page.getByRole('heading', {
      name: /To get started, edit the page.tsx file/
    });
    await expect(heading).toBeVisible();

    // "Deploy Now" リンクが表示されることを確認
    const deployButton = page.getByRole('link', { name: /Deploy Now/ });
    await expect(deployButton).toBeVisible();

    // "Documentation" リンクが表示されることを確認
    const docLink = page.getByRole('link', { name: /Documentation/ });
    await expect(docLink).toBeVisible();
  });

  test('画像が正しく読み込まれる', async ({ page }) => {
    await page.goto('/');

    // Next.js ロゴが表示されることを確認
    const logo = page.getByAltText('Next.js logo');
    await expect(logo).toBeVisible();
  });

  test('存在しない要素を探す（テスト失敗確認用）', async ({ page }) => {
    await page.goto('/');

    // わざと存在しない要素を探してテストを失敗させる
    const nonExistentButton = page.getByRole('button', { name: '存在しないボタン' });
    await expect(nonExistentButton).toBeVisible();
  });
});
