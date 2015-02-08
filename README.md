# di-container

Basic Dependency Injection (DI) container for Node.js inspired by code examples found in the book [Node.js Design Patterns](https://www.packtpub.com/web-development/nodejs-design-patterns).

## Installation

`$ npm install di-container`

## Example

```js
/* lib/person-factory.js */
module.exports = function(name) {
  return {
    name: name
  };
}

/* index.js */
var DiContainer = require('di-container');
var diContainer = new DiContainer();

diContainer.register('name', 'alice');
diContainer.factory('person', require('./lib/person-factory'));

var person = diContainer.get('person');
// person.name == 'alice'
```

# License

[MIT](LICENSE)