var server = require('./server');
var client = require('./client');

server(function() {
  client(function() {
    client(function() {
      console.log('done');
    });
  });
});
