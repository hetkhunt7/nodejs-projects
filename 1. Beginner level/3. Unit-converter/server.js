const http = require('http');
const path = require('path/win32');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    if(pathname == '/' || pathname == '/length'){
        handlePage(req, res, 'length')
    } else if (pathname == '/weight') {
        handlePage(req, res, 'weight');
    } else if (pathname == '/temperature') {
        handlePage(req, res, 'temperature');
    } else {
        res.writeHead(404, { 'Content-Type' : 'text/htmp'});
        res.end(`<h1 >404 - Page Not Found </h1>`);
    }
});

function handlePage(req, res, type) {
    if(req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>${type} page coming soon</h1>`);
    } else if(req.method == 'POST'){
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(`<h1> ${type} page coming soon</h1>`);
    }
}

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});