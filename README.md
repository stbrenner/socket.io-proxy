socket.io-proxy
===============

A socket.io client for node.js that can connect through a proxy server.

[![Build Status](https://www.travis-ci.org/ymx/socket.io-proxy.png?branch=master)](https://www.travis-ci.org/ymx/socket.io-proxy)

Installation
------------

```shell
$ npm install socket.io-proxy
```

How to use
----------

### Based on environment variable

socket.io-proxy will automatically apply the proxy settings based on the http\_proxy environment variable. 
If no proxy is defined, a direct connection to the destination will be established.

```ruby
var proxy = require('socket.io-proxy');

var socket = proxy.connect('http://destination');

socket.on('connect', function () {
    console.log('Socket connected');
    socket.on('command', function (data) {
        console.log('Received data');
    });
    socket.on('disconnect', function() {
        console.log('Socket disconnected');
    });
});
```

On Linux you can specify the environment variable in the following way: `export http_proxy=http://proxy:8080`

On Windows: `set HTTP_PROXY=http://proxy:8080`


### Explicit proxy definition

You can also directly specify the proxy server using the init function.

```ruby
var proxy = require('socket.io-proxy');

proxy.init('http://proxy:8080');
var socket = proxy.connect('http://destination');

socket.on('connect', function () {
    console.log('Socket connected');
    socket.on('command', function (data) {
        console.log('Received data');
    });
    socket.on('disconnect', function() {
        console.log('Socket disconnected');
    });
});
```
