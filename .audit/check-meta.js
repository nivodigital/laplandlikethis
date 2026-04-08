const fs = require('fs');

const pages = [
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

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const hasTitle = /<title[^>]*>[\s\S]*?<\/title>/i.test(html);
  const hasMetaDescription =
    /<meta\s+name=["']description["'][^>]*>/i.test(html) ||
    /<meta\s+content=["'][^"']*["']\s+name=["']description["'][^>]*>/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const hasAllOg = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image'].every((key) => {
    const re = new RegExp(`<meta\\s+property=["']${key}["']`, 'i');
    return re.test(html);
  });

  console.log(`${page},title:${hasTitle ? 'yes' : 'no'},meta:${hasMetaDescription ? 'yes' : 'no'},h1:${h1Count},og_all:${hasAllOg ? 'yes' : 'no'}`);
}
