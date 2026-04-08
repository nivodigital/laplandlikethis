const fs = require('fs');
const path = require('path');

const files = [
  '404.html',
  'about.html',
  'index.html',
  'privacy.html',
  'destinations/index.html',
  'destinations/levi.html',
  'destinations/rovaniemi.html',
  'destinations/saariselka.html',
  'destinations/yllas.html',
  'guides/index.html',
  'guides/lapland-with-kids.html',
  'guides/what-to-pack.html',
  'guides/when-to-go.html'
];

function getCanonicalFromPath(relPath) {
  const noExt = relPath.replace(/\.html$/i, '');
  if (noExt === 'index') return 'https://laplandlikethis.com/';
  if (noExt.endsWith('/index')) {
    return `https://laplandlikethis.com/${noExt.slice(0, -('/index'.length))}`;
  }
  return `https://laplandlikethis.com/${noExt}`;
}

function ensureMeta(content, property, value) {
  const re = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i');
  const tag = `<meta property="${property}" content="${value}">`;

  if (re.test(content)) {
    return content.replace(re, tag);
  }

  const headClose = content.search(/<\/head>/i);
  if (headClose === -1) return content;

  const anchors = [
    /<meta\s+property=["']og:description["'][^>]*>\s*/i,
    /<meta\s+name=["']description["'][^>]*>\s*/i,
    /<link\s+rel=["']canonical["'][^>]*>\s*/i,
    /<title[^>]*>[\s\S]*?<\/title>\s*/i
  ];

  for (const anchor of anchors) {
    const m = content.match(anchor);
    if (m && typeof m.index === 'number') {
      const idx = m.index + m[0].length;
      return content.slice(0, idx) + '\n' + tag + content.slice(idx);
    }
  }

  return content.slice(0, headClose) + tag + '\n' + content.slice(headClose);
}

function extractTitle(content) {
  const m = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : 'Lapland Like This';
}

function extractDescription(content) {
  const m1 = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
  if (m1) return m1[1].trim();
  const m2 = content.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["'][^>]*>/i);
  if (m2) return m2[1].trim();
  return 'Lapland travel guide from people who live here.';
}

function extractCanonical(content) {
  const m = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i);
  return m ? m[1].trim() : null;
}

for (const rel of files) {
  const full = path.join(process.cwd(), rel);
  let content = fs.readFileSync(full, 'utf8');

  content = content.replaceAll('IMG_9396.jpg.jpg', 'IMG_9396.jpg');

  const title = extractTitle(content);
  const desc = extractDescription(content);
  const canonical = extractCanonical(content) || getCanonicalFromPath(rel);

  content = ensureMeta(content, 'og:title', title);
  content = ensureMeta(content, 'og:description', desc);
  content = ensureMeta(content, 'og:type', 'website');
  content = ensureMeta(content, 'og:url', canonical);
  content = ensureMeta(content, 'og:image', 'https://laplandlikethis.com/images/lapland-aurora-night.png');

  fs.writeFileSync(full, content);
  console.log(`updated ${rel}`);
}
