// Compile MDX bodies with the same @mdx-js/mdx major the landing page uses (v3).
// Resolves the package from preview/node_modules. Run `cd preview && npm ci` once if missing.
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

const repo = process.cwd();
const req = createRequire(path.join(repo, 'preview', 'package.json'));
let compile, gfm = null;
try {
  ({ compile } = await import(pathToFileURL(req.resolve('@mdx-js/mdx')).href));
} catch (e) {
  console.log('MDX-ERROR cannot load @mdx-js/mdx from preview/node_modules. Run: cd preview && npm ci');
  process.exit(2);
}
try { gfm = (await import(pathToFileURL(req.resolve('remark-gfm')).href)).default; } catch (e) { /* optional */ }

let bad = 0;
for (const f of process.argv.slice(2)) {
  const body = fs.readFileSync(f, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
  try { await compile(body, { remarkPlugins: gfm ? [gfm] : [] }); }
  catch (e) { bad++; console.log('MDX-ERROR', path.basename(f), String(e.message || e).slice(0, 200)); }
}
if (!bad) console.log(`mdx ok ${process.argv.length - 2}${gfm ? '' : ' (without remark-gfm)'}`);
