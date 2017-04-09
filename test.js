var expect = chai.expect;

describe('MyAPI', function() {
  var xhr;
  var requests;
  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();

    requests = [];
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    xhr.restore();
  });

  it('should parse fetched data as JSON', function(done) {
    var data = { foo: 'bar'};
    var dataJson = JSON.stringify(data);

    myapi.get(function(err, result) {
      expect(result).to.deep.equal(data);
      done();
    })
    requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
  });

});
