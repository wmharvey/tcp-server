var fs = require('fs');
var assert = require('assert');
var server = require('../server');
var client = require('../client');

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

describe('client logging', function() {

  beforeEach(function() {
    deleteFolderRecursive('./clientlogs');
    fs.mkdirSync('./clientlogs');
  });

  it('should create two new files', function() {
    server(function() {
      client(function() {
        client(function() {
          var files = fs.readdirSync('./clientlogs');
          assert.equal(files.length, 2);
        });
      });
    });
  });


});
