# di-container

Basic Dependency Injection (DI) container for Node.js inspired by code examples
found in the book [Node.js Design Patterns]
(https://www.packtpub.com/web-development/nodejs-design-patterns).

### Browser support

This library has not been tested in browsers, but it should be possible to use
with [Browserify](http://browserify.org/) and as long as the browser supports
(or has a polyfills for) `Array.prototype.map()` and `Array.isArray()`.

## Installation

`$ npm install di-container`

## Usage

Factory functions can simply list their named dependencies as arguments (as
made popular by AngularJS). Alternatively, a module can be defined as an array
of dependency names followed by the factory function. The latter form is more
resilient to code minifcation and name mangling.

The method chaining pattern is supported.

### Example

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

## API

Register named dependency.
`di.register(<name>, <dependency>)`

Register named factory function. The argument names in the factory defines its
dependencies.
`di.factory(<name>, <factory>)`

Alternatively register named factory function in the form of an array with named
dependencies followed by the factory function. This syntax should be used if
local variables are mangled during a code minification step.
`di.factory(<name>, <array with dependency names followed by factory>)`

Returns instance from specified factory function or dependency. Factories'
dependencies will be wired and resolved at runtime, which means that the
registering of dependencies and factories do not have to follow a specific
order prior to calling this method.
`di.get(<name>)`

# License

[MIT](LICENSE)