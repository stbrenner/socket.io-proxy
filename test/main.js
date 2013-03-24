var should = require('should');
var proxy = require('../lib/main');

describe('proxy.connect', function() {
    describe('with no arguments', function() {
        it('connects to the server specified in the HTTP_PROXY environment variable', function() {
            proxy.connect();
        });
    });
});

describe('proxy.connect', function() {
    describe('with proxy server URL', function() {
        it('connects to the specified proxy server', function() {
            proxy.connect('http://proxy:8080');
        });
    });
});

describe('proxy.createSocket', function() {
    describe('with no arguments', function() {
        it('returns a socket', function() {
            proxy.createSocket();
        });
    });
});
