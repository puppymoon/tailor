'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');

var respath = '/Users/moontea/Documents/workspace/tailor/examples/test2/webapp2/index.html';
// Root Server
http
    .createServer((req, res) => {
        fs.readFile(respath, function (err, data) {//讀取資源
            if (err) {//發生錯誤，回傳http status 404
                console.log(respath + ' not exists.');
                res.writeHead(404, '');
                res.end();
            } else {//正確，回傳檔案內容
                console.log(respath + ' exists.');
                res.writeHead(200, {
                    "Content-Type": 'text/html',
                    "Content-Length": data.length
                });
                // res.write(data);
                res.end(data);
            }
        });
    })
    .listen(9999, function () {
        console.log('webapp2 server listening on port 9999');
    });
