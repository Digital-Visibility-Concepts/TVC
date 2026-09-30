// Usage: node deploy/verify-live.cjs dist/manifest.json https://trivalleyclinic.com
// Downloads every file listed in the manifest FROM THE PUBLIC SITE (cache-busted) and compares sha256.
// Catches: missing CSS/JS (served as HTML shell), stale cache, overwritten files.
const fs = require('fs');
const crypto = require('crypto');

const [manifestPath, site] = [process.argv[2], (process.argv[3] || '').replace(/\/$/, '')];
if (!manifestPath || !site) { console.error('usage: verify-live.cjs <manifest.json> <site-url>'); process.exit(2); }
const mf = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const SKIP = new Set(['.htaccess']);

function urlFor(p) {
  const clean = p.endsWith('index.html') ? p.slice(0, -'index.html'.length) : p;
  const enc = clean.split('/').map(encodeURIComponent).join('/');
  return `${site}/${enc}${enc.includes('?') ? '&' : '?'}nc=${Date.now()}${Math.floor(Math.random() * 1e6)}`;
}

async function check(f) {
  try {
    const r = await fetch(urlFor(f.p), { headers: { 'Cache-Control': 'no-cache' } });
    const buf = Buffer.from(await r.arrayBuffer());
    const h = crypto.createHash('sha256').update(buf).digest('hex');
    if (r.status === 200 && h === f.h) return null;
    return `${f.p}  [HTTP ${r.status}, ${buf.length}B, ${r.headers.get('content-type')}] expected ${f.s}B`;
  } catch (e) { return `${f.p}  [fetch error: ${e.message}]`; }
}

(async () => {
  const files = mf.files.filter(f => !SKIP.has(f.p) && !f.p.startsWith('blog/'));
  let bad = [];
  for (let attempt = 1; attempt <= 3; attempt++) {
    const todo = attempt === 1 ? files : files.filter(f => bad.some(b => b.startsWith(f.p + '  ')));
    const res = [];
    for (let i = 0; i < todo.length; i += 8) {
      res.push(...await Promise.all(todo.slice(i, i + 8).map(check)));
    }
    bad = res.filter(Boolean);
    console.log(`attempt ${attempt}: ${files.length - bad.length}/${files.length} files match the manifest`);
    if (!bad.length) break;
    if (attempt < 3) await new Promise(r => setTimeout(r, 15000));
  }
  if (bad.length) {
    bad.forEach(b => console.log('::error::LIVE MISMATCH ' + b));
    process.exit(1);
  }
  console.log('All ' + files.length + ' files on the public site match build ' + mf.build.slice(0, 7));
})();
