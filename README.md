# di-container

Basic Dependency Injection (DI) container for Node.js inspired by code examples
found in the book [Node.js Design Patterns]
(https://www.packtpub.com/web-development/nodejs-design-patterns).

## Installation

`$ npm install di-container`

## Usage

Factory functions can simply list their named dependencies as arguments (as
made popular by AngularJS). Alternatively, a module can be defined as an array
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
var di = new DiContainer();

di.register('name', 'alice');
di.factory('person', require('./lib/person-factory'));

var person = di.get('person');
// person.name == 'alice'

di.register('type', 'dog');
di.factory('animal', require('./lib/animal-factory'));

var animal = di.get('animal');
// animal.type == 'dog'
```

# License

[MIT](LICENSE)