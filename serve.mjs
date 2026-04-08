import { createServer } from 'http';
import { readFile } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
  // Get the URL path and remove query string
  let urlPath = req.url.split('?')[0];
  
  // Check if URL has trailing slash (directory request)
  const hasTrailingSlash = urlPath.endsWith('/') && urlPath !== '/';
  
  // Normalize path
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/';
  } else if (hasTrailingSlash) {
    // For /guides/ or /destinations/, try to serve index.html
    const indexPath = join(__dirname, urlPath, 'index.html');
    readFile(indexPath, (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end('404 Not Found');
      }
    });
    return;
  }

  let filePath = join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  // Handle .html extension for clean URLs
  if (!extname(filePath)) {
    filePath += '.html';
  }

  readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try adding .html extension if not found
        if (extname(filePath) !== '.html') {
          const htmlPath = filePath + '.html';
          readFile(htmlPath, (err2, data2) => {
            if (err2) {
              res.writeHead(404);
              res.end('404 Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(data2);
            }
          });
        } else {
          res.writeHead(404);
          res.end('404 Not Found');
        }
      } else {
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
      const ext = extname(filePath);
      let contentType = 'text/html';

      switch (ext) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
        case '.ico':
          contentType = 'image/x-icon';
          break;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});