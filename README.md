# di-container

Basic Dependency Injection (DI) container for Node.js inspired by code examples found in the book [Node.js Design Patterns](https://www.packtpub.com/web-development/nodejs-design-patterns).

## Installation

`$ npm install di-container`

## Usage

Factory functions can simply list their dependencies in the argument list (as
made popular by AngularJS). Alternatively a module can be defined as an array
of dependency names followed by the factory function. The latter form is more
resilient to code minifcation and name mangling.

## Example

```js
/* lib/person-factory.js */
module.exports = function(name) {
  return {
    name: name
  };
}

/* lib/animal-factory.js */
module.exports = ['type', function(a) {
  return {
    type: a
  };
}]

/* index.js */
var DiContainer = require('di-container');
var diContainer = new DiContainer();

diContainer.register('name', 'alice');
diContainer.factory('person', require('./lib/person-factory'));

var person = diContainer.get('person');
// person.name == 'alice'

diContainer.register('type', 'dog');
diContainer.factory('animal', require('./lib/animal-factory'));

var animal = diContainer.get('animal');
// animal.type == 'dog'
```

# License

[MIT](LICENSE)