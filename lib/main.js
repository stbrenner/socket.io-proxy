exports.connect = function(destinationUrl) {
    if (!exports.initialized) exports.init();
    console.log('Bla');
    return 'Bla';
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
