import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { existsSync } from 'node:fs';

const recording = process.env.DEMO_RECORD === '1';
const backendDir = path.resolve(process.env.BACKEND_DIR || (existsSync('../backend/gradlew') ? '../backend' : '../aivle-library-backend'));
const offline = process.env.GRADLE_OFFLINE === '1' ? '--offline ' : '';
export default defineConfig({
  testDir: './e2e',
  testMatch: recording ? '**/showcase.spec.js' : '**/workflow.spec.js',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: recording ? 120000 : 45000,
  expect: { timeout: 10000 },
  reporter: [['list'], ['json', { outputFile: 'e2e-results.json' }], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:15173',
    viewport: { width: 1440, height: 1000 },
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: recording ? { mode: 'on', size: { width: 1440, height: 1000 } } : 'off',
  },
  webServer: [
    {
      name: 'Spring-JPA-H2',
      command: `${process.platform === 'win32' ? 'gradlew.bat' : './gradlew'} ${offline}demoRun`,
      cwd: backendDir,
      url: 'http://127.0.0.1:18080/api/v1/health',
      reuseExistingServer: false,
      timeout: 180000,
      stdout: 'pipe',
      stderr: 'pipe',
      env: { AWS_EC2_METADATA_DISABLED: 'true' },
    },
    {
      name: 'React-production-build',
      command: 'npm run build:demo && npm run preview:demo',
      url: 'http://127.0.0.1:15173',
      reuseExistingServer: false,
      timeout: 180000,
    },
  ],
});
