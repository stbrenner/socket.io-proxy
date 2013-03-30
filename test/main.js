var should = require('should');
var proxy = require('../lib/main');
var io = require('socket.io-client');

describe('proxy.connect', function() {
    describe('with no arguments', function() {
        it('connects to the server specified in the http_proxy environment variable', function() {
            process.env.http_proxy = 'http://proxy:8081';
            var socket = proxy.connect('http://destination');
            should.exist(socket);
        });
    });
});

describe('proxy.connect', function() {
    describe('with proxy server URL', function() {
        it('connects to the specified proxy server', function() {
            proxy.init('http://proxy:8080');
            var socket = proxy.connect('http://destination');
            should.exist(socket);
        });
    });
});
