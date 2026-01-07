import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // テストファイルの場所
  testDir: './e2e',

  // 各テストのタイムアウト（30秒）
  timeout: 30 * 1000,

  // expect() のタイムアウト（5秒）
  expect: {
    timeout: 5000
  },

  // CI で --forbid-only を有効化（.only() でコミットしないよう防止）
  forbidOnly: !!process.env.CI,

  // リトライ設定（CI では失敗時に1回リトライ）
  retries: process.env.CI ? 1 : 0,

  // 並列実行の worker 数（CI では 1、ローカルは CPU コア数に応じて自動）
  workers: process.env.CI ? 1 : undefined,

  // レポート形式（CI では github アクション用、ローカルは html）
  reporter: process.env.CI ? 'github' : 'html',

  // 全テスト共通の設定
  use: {
    // baseURL（環境変数で切り替え）
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // トレース（失敗時のみ記録）
    trace: 'on-first-retry',

    // スクリーンショット（失敗時のみ）
    screenshot: 'only-on-failure',

    // 動画（失敗時のみ）
    video: 'retain-on-failure',
  },

  // テスト対象のブラウザ設定
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // 必要に応じて Firefox や Safari も追加できる
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  // ローカル開発用（npm run test:e2e で自動的に dev サーバー起動）
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
