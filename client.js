module.exports = function(callback) {
  var net = require('net');

  var client = net.connect( { port: 8080 }, function () {
    console.log('connected to server!');
    client.write('Here is my first request');
    client.end();
    callback();
  });
};
