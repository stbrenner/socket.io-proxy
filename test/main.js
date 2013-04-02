var should = require('should');
var proxy = require('../lib/main');
var io = require('socket.io-client');

describe('proxy.connect', function() {
    describe('with no arguments', function() {
        describe('and http_proxy env variable defined', function() {
            it('connects to the destination through the proxy', function() {
                process.env.http_proxy = 'http://proxy:8081';
                proxy.init();
                var socket = proxy.connect('https://destination');
                should.exist(socket);
            });
        });
        describe('and http_proxy env variable not defined', function() {
            it('directly connects to the destination', function() {
                process.env.http_proxy = '';
                proxy.init();
                var socket = proxy.connect('http://destination');
                should.exist(socket);
            });
        });
    });
    describe('with proxy server URL', function() {
        it('connects to the specified proxy server', function() {
            proxy.init('http://proxy:8080');
            var socket = proxy.connect('http://destination');
            should.exist(socket);
        });
    });
});
