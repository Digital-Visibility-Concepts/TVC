// Usage: node deploy/make-manifest.cjs dist
// Writes <dir>/manifest.json = { build, files: [{p: path, s: size, h: sha256}] }
// The server hook copies ONLY files listed here, and verifies every hash.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = process.argv[2] || 'dist';
const build = process.env.GITHUB_SHA || process.argv[3];
if (!build) { console.error('GITHUB_SHA (or 2nd arg) missing'); process.exit(1); }
if (!fs.existsSync(root)) { console.error('dir not found: ' + root); process.exit(1); }

const SKIP = new Set(['manifest.json', '.cpanel.yml']);
const files = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full); continue; }
    if (!e.isFile()) continue;
    const rel = path.relative(root, full).split(path.sep).join('/');
    if (SKIP.has(rel)) continue;
    const buf = fs.readFileSync(full);
    files.push({ p: rel, s: buf.length, h: crypto.createHash('sha256').update(buf).digest('hex') });
  }
})(root);

files.sort((a, b) => (a.p < b.p ? -1 : 1));
fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify({ build, files }));
console.log('manifest: ' + files.length + ' files, build ' + build.slice(0, 7));
