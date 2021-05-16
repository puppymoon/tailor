'use strict';
const http = require('http');
const Tailor = require('../../');
// const Tailor = require('node-tailor');
// const serveFragment = require('./generateFragment.js');

//宣告tailor
const tailor = new Tailor({
    templatesPath: '/Users/moontea/Documents/workspace/tailor/examples/test2/pagetpl/index.html'
});

// Root Server
http
    .createServer((req, res) => {
        tailor.requestHandler(req, res);
    })
    .listen(8080, function() {
        console.log('Tailor server listening on port 8080');
    });
//8080 綁定主服務
// const server = http.createServer((req, res) => {
//     if (req.url === '/favicon.ico') {
//         res.writeHead(200, { 'Content-Type': 'image/x-icon' });
//         return res.end('');
//     }
// }).listen(8080);
// console.log('Tailor started at port 8080.');
// tailor.on('error', (request, err) => console.error(err));

//8081 綁定footer服務
// const fragment1 = http.createServer(
//     serveFragment('Header', 'http://localhost:8081', 1)
// ).listen(8081);
// console.log('Fragment Header started at port 8081.');
// ``
// //8082 綁定content服務
// const fragment2 = http.createServer(
//     serveFragment('Content', 'http://localhost:8082', 1)
// ).listen(8082);
// console.log('Fragment Content started at port 8082.');
