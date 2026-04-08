/**
 * Pass 2 fix script
 * - Fix invalid <bq> elements → <blockquote class="bq ...">
 * - Fix raw & in HTML content → &amp;
 * - Shorten long page titles
 * - Add type="button" to all <button> elements missing it
 */
const fs = require('fs');
const path = require('path');

const files = [
  'about.html','index.html','destinations/index.html','guides/index.html',
  'destinations/levi.html','destinations/rovaniemi.html',
  'destinations/saariselka.html','destinations/yllas.html',
  'guides/when-to-go.html','guides/what-to-pack.html',
  'guides/lapland-with-kids.html','privacy.html','404.html'
];

// --- 1. Long title fixes ---
const titleFixes = {
  'destinations/index.html': 'Levi, Rovaniemi, Saariselkä &amp; Ylläs — Lapland Like This',
  'guides/index.html': 'Lapland Planning Guides — Lapland Like This',
  'destinations/levi.html': 'Levi Finland Guide — Honest Advice — Lapland Like This',
  'destinations/saariselka.html': 'Saariselkä Guide — Northern Lights &amp; Aurora — Lapland Like This',
};

let totalChanges = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // --- 1. Fix <bq class="d"> / <bq class="l"> / <bq class="d" style="..."> ---
  // Replace opening <bq ...> tags
  content = content.replace(/<bq\s+class="([^"]+)"(\s+style="[^"]*")?>/g, (match, cls, style) => {
    const newCls = 'bq ' + cls;
    if (style) {
      return `<blockquote class="${newCls}"${style}>`;
    }
    return `<blockquote class="${newCls}">`;
  });
  // Replace closing </bq>
  content = content.replace(/<\/bq>/g, '</blockquote>');
  // Update CSS selectors: bq.d → blockquote.bq.d, bq.l → blockquote.bq.l
  content = content.replace(/\bbq\.(d|l)\b/g, 'blockquote.bq.$1');

  // --- 2. Fix raw & in HTML text content and attributes (not in scripts or style blocks, not URLs) ---
  // Strategy: parse out <script> and <style> blocks, fix & in the rest
  // We'll use a multi-pass approach: protect script/style, fix &, restore
  const scriptStyleRe = /(<(?:script|style)[^>]*>)([\s\S]*?)(<\/(?:script|style)>)/gi;
  const protectedBlocks = [];
  content = content.replace(scriptStyleRe, (match, open, body, close) => {
    const idx = protectedBlocks.length;
    protectedBlocks.push(match);
    return `\x00BLOCK${idx}\x00`;
  });

  // Now fix raw & in remaining content (text nodes and attribute values)
  // Only fix & that are NOT already part of an entity reference
  // An entity reference is &[a-zA-Z]+; or &#[0-9]+; or &#x[0-9a-fA-F]+;
  content = content.replace(/&(?![a-zA-Z]+;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, '&amp;');

  // Restore protected blocks
  content = content.replace(/\x00BLOCK(\d+)\x00/g, (_, idx) => protectedBlocks[parseInt(idx)]);

  // --- 3. Fix long titles ---
  if (titleFixes[file]) {
    content = content.replace(/<title>[^<]*<\/title>/, `<title>${titleFixes[file]}</title>`);
  }

  // --- 4. Add type="button" to <button> elements missing a type attribute ---
  // Match <button followed by attributes that don't contain type=
  content = content.replace(/<button(\s[^>]*)?>/g, (match, attrs) => {
    if (!attrs) return '<button type="button">';
    if (/\btype\s*=/.test(attrs)) return match; // already has type
    return `<button${attrs} type="button">`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const lines = content.split('\n').length;
    console.log(`updated: ${file} (${lines} lines)`);
    totalChanges++;
  } else {
    console.log(`no changes: ${file}`);
  }
});

console.log(`\nDone. ${totalChanges} files updated.`);
