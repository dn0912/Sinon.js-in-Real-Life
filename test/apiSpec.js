var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http');

var api = require('../api.js');

describe('api', function() {
  var request;
  beforeEach(function() {
    request = sinon.stub(http, 'request');
  });

  afterEach(function() {
    request.restore();
  });

  it('should convert get result to object', function(done) {
    var expected = { hello: 'world' };
    var response = new PassThrough();
    response.write(JSON.stringify(expected));
    response.end();

    var request = new PassThrough();

    request.yields(response)
           .returns(request);

    api.get(function(err, result) {
      assert.deepEqual(result, expected);
      done();
    });
  });
});
