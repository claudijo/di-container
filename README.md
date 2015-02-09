# di-container

Basic Dependency Injection (DI) container for Node.js inspired by code examples
found in the book [Node.js Design Patterns]
(https://www.packtpub.com/web-development/nodejs-design-patterns).

### Browser support

This library has not been tested in browsers, but it should be possible to use
with [Browserify](http://browserify.org/) and as long as the browser support
(or has a polyfills for) `Array.prototype.map()` and `Array.isArray`.

## Installation

`$ npm install di-container`

## Usage

Factory functions can simply list their named dependencies as arguments (as
made popular by AngularJS). Alternatively, a module can be defined as an array
of dependency names followed by the factory function. The latter form is more
resilient to code minifcation and name mangling.

The method chaining pattern is supported.

## Example

```js
/* lib/person-factory.js */
module.exports = function(name) {
  return {
    name: name
  };
};

/* lib/animal-factory.js */
module.exports = ['type', function(a) {
  return {
    type: a
  };
}];

/* lib/vehicle-factory.js */
module.exports = function(speed) {
  return {
    speed: speed
  };
};

/* index.js */
var assert = require('assert');
var DiContainer = require('di-container');
var di = new DiContainer();

// Using a module that returns a factory with listed named dependencies.
di.register('name', 'alice');
di.factory('person', require('./lib/person-factory'));

var person = di.get('person');
assert(person.name === 'alice');

// Using a module that defines an array of dependency names followed by the
// factory function
di.register('type', 'dog');
di.factory('animal', require('./lib/animal-factory'));

var animal = di.get('animal');
assert(animal.type === 'dog');

// Method chaining
di.factory('vehicle', require('./lib/vehicle-factory')).register('speed', 'fast');

var vehicle = di.get('vehicle');
assert(vehicle.speed === 'fast');
```

# License

[MIT](LICENSE)