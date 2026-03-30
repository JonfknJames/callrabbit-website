// serve.js — Minimal static file server (zero dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4300;
const ROOT = process.env.SERVE_ROOT || __dirname;

const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
};

http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? 'callrabbit-v2.html' : req.url);
    filePath = decodeURIComponent(filePath.split('?')[0]);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
        }
        res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
}).listen(PORT, () => {
    console.log(`Static server running at http://localhost:${PORT}`);
});
