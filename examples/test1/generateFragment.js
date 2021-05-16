'use strict';
const url = require('url');

const jsHeaders = {
    'Content-Type': 'application/javascript',
    'Access-Control-Allow-Origin': '*'
};

const defineFn = (module, fragmentName) => {
    return `define (['$(module)'], function (module){
        return function initFragment (element) {
            element.className += ' fragment-$(fragmentName)-$(module)';
            element.innerHTML += '<br>' + '<b>產生效果by javascript</b>';
        }
    })`;
};

module.exports = (fragmentName, fragmentUrl, modules = 1, delay = false) => (
    request,
    response
) => {
    const pathname = url.parse(request.url).pathname;
    switch (pathname) {
        case '/fragment.js':
            if (delay) {
                return setTimeout(() => {
                    response.writeHead(200, jsHeaders);
                    response.end(defineFn('js', fragmentName));
                }, 500);
            } else {
                response.writeHead(200, jsHeaders);
                response.end(defineFn('js', fragmentName));
            }
            break;
        case '/fragment.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(`
                .fragment-${fragmentName}{
                    padding: 30px;
                    margin: 10px;
                    text-align: center;
                }
                .fragment-${fragmentName}-js{
                    background-color:lightgrey;
                }
            `);
            break;
        default:
            const scriptLinks = [];
            for (var i = 0; i < modules; i++) {
                scriptLinks[i] = `<${fragmentUrl}/fragment.js>; rel="fragment-script"`;
            }

            response.writeHead(200, {
                Link: `<${fragmentUrl}/fragment.css>; rel="stylesheet",${scriptLinks.join(',')}`, 'Content-Type': 'text/html'
            });
            response.end(`
                <div class="fragment-${fragmentName}">
                    fragment: ${fragmentName}
                </div>
            `);
    }
};