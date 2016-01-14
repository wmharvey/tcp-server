module.exports = function(callback) {
  var net = require('net');
  var fs = require('fs');
  var uuid = require('node-uuid');

  var server = net.createServer(function(c) {
    console.log('client connected');

    c.on('data', function(data) {
      var filename = './clientlogs/' + uuid.v1() + '.txt';
      fs.writeFileSync(filename, data.toString());
    });
  });

  server.listen(8080, function() {
    console.log('server bound');
    callback();
  });
};
