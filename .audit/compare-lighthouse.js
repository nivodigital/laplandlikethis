const fs = require('fs');

function load(file) {
  const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
  const rows = lines.slice(1).map((line) => {
    const [page, performance, accessibility, seo] = line.split(',');
    return { page, performance: Number(performance), accessibility: Number(accessibility), seo: Number(seo) };
  });
  return rows;
}

const before = load('.audit/lighthouse-summary.csv');
const after = load('.audit/lighthouse-summary-after.csv');
const beforeMap = new Map(before.map((row) => [row.page, row]));

console.log('page,perf_delta,a11y_delta,seo_delta');
for (const row of after) {
  const prev = beforeMap.get(row.page);
  if (!prev) continue;
  console.log(
    [
      row.page,
      row.performance - prev.performance,
      row.accessibility - prev.accessibility,
      row.seo - prev.seo
    ].join(',')
  );
}
