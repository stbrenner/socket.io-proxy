(function(){
    var http = require('http');
    var url = require('url');
    var io = require('socket.io-client');

    var tunnelPort = 61423;
    var httpServer;

    exports.connect = function(destinationUrl, options) {
        var destination = url.parse(destinationUrl);
        if (!destination.port) {
            destination.port = destination.protocol === 'https:' ? 443 : 80;
        }

        if (typeof httpServer === 'undefined') return io.connect(destinationUrl, options);   // Direct connection

        return io.connect('http://localhost:' + tunnelPort + '/' +
            '?protocol=' + destination.protocol.replace(':', '')  + 
            '&hostname=' + destination.hostname +
            '&port=' + destination.port, options);
    };

    exports.init = function(proxyUrl) {
        if (typeof httpServer !== 'undefined') {
            httpServer.close();
            httpServer = undefined;
        }

        if (typeof proxyUrl === 'undefined') {
            if (process.env.http_proxy) {
                proxyUrl = process.env.http_proxy;
            } else {
                console.log('Direct connection (no proxy defined)');
                return;
            }        
        }

        var proxy = url.parse(proxyUrl, true);

        httpServer = http.createServer(function (request, response) {
            var requestUrl = url.parse(request.url);
            var hostname = requestUrl.query.hostname;
            var port = requestUrl.query.port;

            var options = {
                hostname: typeof proxy !== 'undefined' ? proxy.hostname : hostname,
                port: typeof proxy !== 'undefined' ? proxy.port : port,
                path: requestUrl.pathname,
                method: request.method,
                headers: {
                    'Host': hostname + ':' + port
                }
            };

            var proxy_request = http.request(options);

            proxy_request.addListener('response', function (proxy_response) {
                proxy_response.addListener('data', function (chunk) { response.write(chunk, 'binary'); });
                proxy_response.addListener('end', function () { response.end(); });
                response.writeHead(proxy_response.statusCode, proxy_response.headers);
            });
            
            request.addListener('data', function (chunk) { proxy_request.write(chunk, 'binary'); });
            request.addListener('end', function () { proxy_request.end(); });
        });
        
        httpServer.listen(tunnelPort);
        console.log('Proxy: ' + proxyUrl);
    };
})();
