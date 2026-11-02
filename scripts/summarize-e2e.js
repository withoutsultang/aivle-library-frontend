import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('e2e-results.json', 'utf8'));
const cases = [];
function visit(suite) {
  for (const spec of suite.specs || []) {
    const results = spec.tests.flatMap(test => test.results);
    cases.push({ title: spec.title, passed: spec.ok, durationMs: results.reduce((sum, result) => sum + result.duration, 0) });
  }
  for (const child of suite.suites || []) visit(child);
}
for (const suite of report.suites) visit(suite);
if (cases.length !== 6 || cases.some(item => !item.passed)) throw new Error('A complete six-case run is required');
fs.mkdirSync('docs/evidence', { recursive: true });
fs.writeFileSync('docs/evidence/e2e-summary.json', JSON.stringify({
  scope: 'Local real React production build / Spring REST+Security+JPA / H2 SQL',
  externalAdapters: ['Demo session instead of Naver OAuth', 'Local sample cover provider and in-memory object storage', 'Stubbed DynamoDB counter'],
  browser: 'Playwright Chromium',
  runStartedAt: report.stats.startTime,
  durationMs: report.stats.duration,
  passed: 6,
  failed: 0,
  cases,
}, null, 2) + '\n');
console.log('Sanitized six-case full-stack evidence saved.');
