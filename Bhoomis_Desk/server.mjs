import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const port = Number(process.env.PORT || 5173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.ico':'image/x-icon'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent((req.url || '/').split('?')[0]); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end('Forbidden'); return; }
  if (file === root || pathname.endsWith('/')) file = path.join(file, 'index.html');
  fs.readFile(file, (error, bytes) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(bytes);
  });
}).listen(port, () => console.log(`Bhoomi’s Desk: http://localhost:${port}`));
