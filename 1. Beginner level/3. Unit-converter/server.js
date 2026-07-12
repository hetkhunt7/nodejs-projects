const http = require('http');
const path = require('path/win32');
const url = require('url');
const { convertLength } = require('./pages/length');
const { convertWeight } = require('./pages/weight');
const { convertTemperature } = require('./pages/temperature');
const { lengthForm, weightForm, temperatureForm } = require('./pages/templates');
const { resolve } = require('dns');

const PORT = 3000;

function parseBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const params = new URLSearchParams(body);
            resolve({
                value : params.get('value'),
                from : params.get('from'),
                to : params.get('to')
            });
        });
    });
}

function formatResult(value, from, to, result) {
    const fromShort = from.slice(0, 3);
    const toShort = to.slice(0, 3);
    return `${value} ${fromShort} = ${result} ${toShort}`;
}

const server = http.createServer(async (req, res) => {
    const pathname = url.parse(req.url).pathname;
    const method = req.method;

    if(pathname == '/' || pathname == '/length') {
        if(method == 'GET') {
            return res.end(lengthForm());
        }
        if(method == 'POST') {
            const { value, from, to } = await parseBody(req);
            const result = convertLength(parseFloat(value), from, to);
            const display = result !== null ? formatResult(value, from, to, result) : 'invalid conversion';
            return res.end(lengthForm(display, from, to, value));
        }
    }

    // WEIGHT
    if (pathname === '/weight') {
        if (method === 'GET') {
        return res.end(weightForm());
        }
        if (method === 'POST') {
        const { value, from, to } = await parseBody(req);
        const result = convertWeight(parseFloat(value), from, to);
        const display = result !== null
            ? formatResult(value, from, to, result)
            : 'Invalid conversion.';
        return res.end(weightForm(display, from, to, value));
        }
    }

  // TEMPERATURE
    if (pathname === '/temperature') {
        if (method === 'GET') {
        return res.end(temperatureForm());
        }
        if (method === 'POST') {
        const { value, from, to } = await parseBody(req);
        const result = convertTemperature(parseFloat(value), from, to);
        const display = result !== null
            ? formatResult(value, from, to, result)
            : 'Invalid conversion.';
        return res.end(temperatureForm(display, from, to, value));
        }
    }

    res.writeHead(404, { 'Content-Type' : 'text/htmp'});
    res.end(`<h1>404 - Page Not Found </h1>`);
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