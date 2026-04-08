const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const root = process.cwd();
const files = walk(root);
const htmlFiles = files.filter((f) => f.endsWith('.html')).map((f) => path.relative(root, f)).sort();
const imageExt = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const imageFiles = files
  .filter((f) => imageExt.has(path.extname(f).toLowerCase()))
  .map((f) => path.relative(root, f))
  .sort();

function extractTagContent(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function countMatches(html, regex) {
  const m = html.match(regex);
  return m ? m.length : 0;
}

function hasRegex(html, regex) {
  return regex.test(html);
}

const pageAudit = [];
const titleMap = new Map();

for (const rel of htmlFiles) {
  const full = path.join(root, rel);
  const html = fs.readFileSync(full, 'utf8');

  const title = extractTagContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDesc =
    extractTagContent(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i) ||
    extractTagContent(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["'][^>]*>/i);
  const h1Count = countMatches(html, /<h1\b[^>]*>/gi);

  const ogTags = {
    title: hasRegex(html, /<meta\s+property=["']og:title["'][^>]*>/i) || hasRegex(html, /<meta\s+[^>]*property=["']og:title["']/i),
    description:
      hasRegex(html, /<meta\s+property=["']og:description["'][^>]*>/i) ||
      hasRegex(html, /<meta\s+[^>]*property=["']og:description["']/i),
    type: hasRegex(html, /<meta\s+property=["']og:type["'][^>]*>/i) || hasRegex(html, /<meta\s+[^>]*property=["']og:type["']/i),
    url: hasRegex(html, /<meta\s+property=["']og:url["'][^>]*>/i) || hasRegex(html, /<meta\s+[^>]*property=["']og:url["']/i),
    image: hasRegex(html, /<meta\s+property=["']og:image["'][^>]*>/i) || hasRegex(html, /<meta\s+[^>]*property=["']og:image["']/i)
  };

  const fontsOk = hasRegex(html, /fonts\.googleapis\.com\/css2\?family=Fraunces/i) && hasRegex(html, /family=DM\+Sans/i);
  const hasNav = hasRegex(html, /<nav\b/i);
  const hasFooter = hasRegex(html, /<footer\b/i);
  const hasRootTokens = hasRegex(html, /--forest\s*:\s*#1F3D2B/i) && hasRegex(html, /--amber\s*:\s*#D9A441/i);

  const navSnippet = extractTagContent(html, /<nav\b[^>]*>([\s\S]*?)<\/nav>/i) || '';
  const footerSnippet = extractTagContent(html, /<footer\b[^>]*>([\s\S]*?)<\/footer>/i) || '';
  const navFingerprint = navSnippet.replace(/\s+/g, ' ').replace(/<[^>]+>/g, '').trim().slice(0, 200);
  const footerFingerprint = footerSnippet.replace(/\s+/g, ' ').replace(/<[^>]+>/g, '').trim().slice(0, 200);

  if (title) {
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(rel);
  }

  pageAudit.push({
    page: rel,
    title,
    metaDescPresent: Boolean(metaDesc),
    h1Count,
    ogTags,
    design: { fontsOk, hasNav, hasFooter, hasRootTokens, navFingerprint, footerFingerprint }
  });
}

const duplicateTitles = [...titleMap.entries()]
  .filter(([, pages]) => pages.length > 1)
  .map(([title, pages]) => ({ title, pages }));

async function auditImages() {
  const threshold = 300 * 1024;
  const oversized = [];
  const optimizedDir = path.join(root, '.audit', 'optimized-images');
  fs.mkdirSync(optimizedDir, { recursive: true });

  for (const rel of imageFiles) {
    const full = path.join(root, rel);
    const stat = fs.statSync(full);
    if (stat.size <= threshold) continue;

    const ext = path.extname(rel).toLowerCase();
    const outRel = rel.replace(/\//g, '__');
    const outPath = path.join(optimizedDir, outRel);

    let pipeline = sharp(full, { failOn: 'none' });
    if (ext === '.png') pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
    else if (ext === '.webp') pipeline = pipeline.webp({ quality: 80 });
    else pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });

    await pipeline.toFile(outPath);
    const outSize = fs.statSync(outPath).size;
    oversized.push({
      file: rel,
      originalKB: +(stat.size / 1024).toFixed(1),
      optimizedKB: +(outSize / 1024).toFixed(1),
      savingsKB: +((stat.size - outSize) / 1024).toFixed(1),
      savingsPct: +(((stat.size - outSize) / stat.size) * 100).toFixed(1)
    });
  }

  return oversized.sort((a, b) => b.originalKB - a.originalKB);
}

(async () => {
  const oversizedImages = await auditImages();
  const out = { pageAudit, duplicateTitles, oversizedImages };
  fs.writeFileSync(path.join(root, '.audit', 'site-audit.json'), JSON.stringify(out, null, 2));

  console.log('=== META + STRUCTURE SUMMARY ===');
  for (const p of pageAudit) {
    const missingOg = Object.entries(p.ogTags)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    console.log(`${p.page} | title:${p.title ? 'yes' : 'NO'} meta:${p.metaDescPresent ? 'yes' : 'NO'} h1:${p.h1Count} og-missing:${missingOg.length ? missingOg.join('/') : 'none'}`);
  }

  if (duplicateTitles.length) {
    console.log('\n=== DUPLICATE TITLES ===');
    for (const d of duplicateTitles) {
      console.log(`"${d.title}" -> ${d.pages.join(', ')}`);
    }
  } else {
    console.log('\n=== DUPLICATE TITLES === none');
  }

  console.log('\n=== DESIGN CONSISTENCY CHECK ===');
  const noFonts = pageAudit.filter((p) => !p.design.fontsOk).map((p) => p.page);
  const noNav = pageAudit.filter((p) => !p.design.hasNav).map((p) => p.page);
  const noFooter = pageAudit.filter((p) => !p.design.hasFooter).map((p) => p.page);
  const noTokens = pageAudit.filter((p) => !p.design.hasRootTokens).map((p) => p.page);
  console.log('Missing brand font import:', noFonts.length ? noFonts.join(', ') : 'none');
  console.log('Missing <nav>:', noNav.length ? noNav.join(', ') : 'none');
  console.log('Missing <footer>:', noFooter.length ? noFooter.join(', ') : 'none');
  console.log('Missing key brand tokens:', noTokens.length ? noTokens.join(', ') : 'none');

  const navVariants = new Set(pageAudit.map((p) => p.design.navFingerprint));
  const footerVariants = new Set(pageAudit.map((p) => p.design.footerFingerprint));
  console.log('Nav variants detected:', navVariants.size);
  console.log('Footer variants detected:', footerVariants.size);

  console.log('\n=== OVERSIZED IMAGES (>300KB) + SHARP OPT PREVIEW ===');
  if (!oversizedImages.length) console.log('none');
  for (const i of oversizedImages) {
    console.log(`${i.file} | ${i.originalKB}KB -> ${i.optimizedKB}KB | saved ${i.savingsKB}KB (${i.savingsPct}%)`);
  }
})();
