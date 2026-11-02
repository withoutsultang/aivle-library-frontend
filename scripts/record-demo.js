import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test'], {
  stdio: 'inherit', env: { ...process.env, DEMO_RECORD: '1' },
});
if (result.status !== 0) process.exit(result.status || 1);
const videos = fs.readdirSync('test-results', { recursive: true }).filter(name => name.endsWith('video.webm'));
if (videos.length !== 1) throw new Error('Expected exactly one successful showcase recording');
const destination = path.join('docs', 'assets', 'demo', 'showcase.webm');
fs.copyFileSync(path.join('test-results', videos[0]), destination);
console.log('Successful real-browser recording saved:', destination);
