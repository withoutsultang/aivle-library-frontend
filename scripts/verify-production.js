import fs from 'node:fs';
import path from 'node:path';

const forbidden = ['/auth/demo/session', '포트폴리오 로컬 데모', '예시 표지 1장 추가'];
for (const file of fs.readdirSync('dist/assets').filter(name => name.endsWith('.js'))) {
  const source = fs.readFileSync(path.join('dist/assets', file), 'utf8');
  for (const marker of forbidden) {
    if (source.includes(marker)) throw new Error(`Demo UI found in production build: ${file}`);
  }
}
console.log('Production assets exclude demo session and sample-cover UI.');
