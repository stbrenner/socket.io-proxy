var io = require('socket.io-client');

exports.connect = function(destinationUrl) {
    if (!exports.initialized) exports.init();
    return io.connect('http://localhost:61423');
};

exports.init = function(proxyUrl) {
    if (typeof proxyUrl === 'undefined') {
        if (typeof process.env.http_proxy !== 'undefined') {
            proxyUrl = process.env.http_proxy;
        } else {
            throw new Error('No proxy defined');
        }        
    }
    
    console.log('Proxy: ' + proxyUrl);
    exports.initialized = true;
};

exports.initialized = false;
