const fs = require('fs');
const files = ['about.html','index.html','destinations/index.html','guides/index.html','destinations/levi.html','destinations/rovaniemi.html','destinations/saariselka.html','destinations/yllas.html','guides/when-to-go.html','guides/what-to-pack.html','guides/lapland-with-kids.html','privacy.html','404.html'];
const validEntities = /&(amp|lt|gt|quot|copy|apos|nbsp|mdash|ndash|middot|hellip|raquo|laquo|reg|trade|euro|times|#[0-9]+|#x[0-9a-fA-F]+);/g;
files.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    // Skip lines that are inside <script> or <style> blocks (we'll handle at line level simply)
    // Find & that are NOT part of a valid entity
    const stripped = l.replace(validEntities, 'ENTITY');
    if (stripped.includes('&')) {
      // Find positions
      const re = /&/g;
      let m;
      while ((m = re.exec(stripped)) !== null) {
        console.log(`${f}:${i+1}: ${l.trim().substring(0, 120)}`);
      }
    }
  });
});
