(function(){
    var http = require('http');
    var url = require('url');
    var io = require('socket.io-client');

    var tunnelPort = 61423;
    var httpServer;

    exports.connect = function(destinationUrl) {
        var destination = url.parse(destinationUrl);
        if (typeof httpServer === 'undefined') exports.init();
        return io.connect('http://localhost:' + tunnelPort + '/' + 
            destination.protocol.replace(':', '') + '/' + 
            destination.hostname + '/' +
            destination.port + '/');
    };

    exports.init = function(proxyUrl) {
        if (typeof proxyUrl === 'undefined') {
            if (typeof process.env.http_proxy !== 'undefined') {
                proxyUrl = process.env.http_proxy;
            } else {
                throw new Error('No proxy defined');
            }        
        }

        if (typeof httpServer !== 'undefined') httpServer.close();

        var proxy = url.parse(proxyUrl);

        httpServer = http.createServer(function (request, response) {
            var pathParts = request.url.split('/');
            var hostname = pathParts[1];
            var port = pathParts[2];

            var options = {
                hostname: typeof proxy !== 'undefined' ? proxy.hostname : hostname,
                port: typeof proxy !== 'undefined' ? proxy.port : port,
                path: '/',
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
