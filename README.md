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
module.exports = function(name, age) {
  return {
    name: name,
    age: age
  };
};

/* lib/animal-factory.js */
module.exports = ['type', 'legCount', function(a, b) {
  return {
    type: a,
    legCount: b
  };
}];

/* lib/vehicle-factory.js */
module.exports = function(speed, manufacturer, person) {
  return {
    speed: speed,
    manufacturer: manufacturer,
    owner: person
  };
};

/* index.js */
var assert = require('assert');
var DiContainer = require('di-container');
var di = new DiContainer();

// Using a module that returns a factory with listed named dependencies.
di.register('name', 'alice');
di.register('age', 30);
di.factory('person', require('./lib/person-factory'));

var person = di.get('person');
assert(person.name === 'alice');
assert(person.age === 30);

// Using a module that defines an array of dependency names followed by the
// factory function
di.register('type', 'dog');
di.register('legCount', 4);
di.factory('animal', require('./lib/animal-factory'));

var animal = di.get('animal');
assert(animal.type === 'dog');
assert(animal.legCount === 4);

// Method chaining and using other factories as dependencies
di.factory('vehicle', require('./lib/vehicle-factory'))
  .register('speed', 'fast')
  .register('manufacturer', 'volvo');

var vehicle = di.get('vehicle');
assert(vehicle.speed === 'fast');
assert(vehicle.manufacturer === 'volvo');
assert(vehicle.owner.name === 'alice');
```

## API

Register named dependency.

`di.register(<name>, <dependency>)`

Register named factory function. The argument name in the factory defines its
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

## Test

Run unit tests;

`$ npm test`

Create test coverage report:

`$ npm run-script test-cov`

# License

[MIT](LICENSE)
