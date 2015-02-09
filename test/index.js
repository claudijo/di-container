var assert = require('assert');
var DiContainer = require('..');

describe('Dependency Injector container', function() {
  var di;

  beforeEach(function() {
    di = new DiContainer();
  });

  it('should create object from factory function that does not require ' +
  'dependencies', function() {
    di.factory('createAnonymousPerson', function() {
      return {
        name: null
      }
    });
    assert(di.get('createAnonymousPerson').name === null);
  });

  it('should create object from a factory functions with dependency names ' +
  'listed as arguments to the factory function', function() {
    di.register('name', 'alice');
    di.factory('createPerson', function(name) {
      return {
        name: name
      }
    });
    assert(di.get('createPerson').name === 'alice');
  });

  it('should create object from an array of dependency names followed by the ' +
  'factory function', function() {
    di.register('name', 'alice');
    di.factory('createPerson', [
      'name',
      function(a) {
        return {
          name: a
        }
      }
    ]);
    assert(di.get('createPerson').name === 'alice');
  });

  it('should throw if dependency has not been registered', function() {
    di.factory('createPerson', function(name) {
      return {
        name: name
      }
    });

    try {
      di.get('createPerson');
    } catch(err) {
      assert(err.message === 'Cannot find module: name');
    }
  });

  it('should throw if factory is unrecognized', function() {
    di.factory('createPerson', 'invalid factory');

    try {
      di.get('createPerson');
    } catch(err) {
      assert(err.message === 'Unrecognized factory: invalid factory');
    }
  });

  it('should be possible to chain calls to factory', function() {
    di.factory('createPerson', function(name) {
      return {
        name: name
      }
    }).register('name', 'alice');

    assert(di.get('createPerson').name === 'alice');
  });

  it('should be possible to chain calls to register', function() {
    di.register('name', 'alice').factory('createPerson', function(name) {
      return {
        name: name
      }
    });

    assert(di.get('createPerson').name === 'alice');
  });

  it('should be possible to instantiate without using the new keyword', function() {
    var newlessDi = DiContainer();
    assert(newlessDi instanceof DiContainer);
  })
});