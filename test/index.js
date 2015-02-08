var assert = require('assert');
var DiContainer = require('..');

describe('Dependency Injector container', function() {
  var diContainer;

  beforeEach(function() {
    diContainer = new DiContainer();
  });

  it('should create object from factory function that does not require ' +
  'dependencies', function() {
    diContainer.factory('createAnonymousPerson', function() {
      return {
        name: null
      }
    });
    assert(diContainer.get('createAnonymousPerson').name === null);
  });

  it('should create object from a factory functions with dependency names ' +
  'listed as arguments to the factory function', function() {
    diContainer.register('name', 'alice');
    diContainer.factory('createPerson', function(name) {
      return {
        name: name
      }
    });
    assert(diContainer.get('createPerson').name === 'alice');
  });

  it('should create object from an array of dependency names followed by the ' +
  'factory function', function() {
    diContainer.register('name', 'alice');
    diContainer.factory('createPerson', [
      'name',
      function(a) {
        return {
          name: a
        }
      }
    ]);
    assert(diContainer.get('createPerson').name === 'alice');
  });

  it('should throw if dependency has not been registered', function() {
    diContainer.factory('createPerson', function(name) {
      return {
        name: name
      }
    });

    try {
      diContainer.get('createPerson');
    } catch(err) {
      assert(err.message === 'Cannot find module: name');
    }
  });

  it('should throw if factory is unrecognized', function() {
    diContainer.factory('createPerson', 'invalid factory');

    try {
      diContainer.get('createPerson');
    } catch(err) {
      assert(err.message === 'Unrecognized factory: invalid factory');
    }

  });
});