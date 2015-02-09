var argsList = require('args-list');

var DiContainer = function() {
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }

  this.dependencies = {};
  this.factories = {};
};

DiContainer.prototype = {
  factory: function(name, factory) {
    this.factories[name] = factory;

    return this;
  },

  register: function(name, dependency) {
    this.dependencies[name] = dependency;

    return this;
  },

  get: function(name) {
    var factory;

    if (!this.dependencies[name]) {
      factory = this.factories[name];
      this.dependencies[name] = factory && this._inject(factory);
    }

    if (!this.dependencies[name]) {
      throw new Error('Cannot find module: ' + name);
    }

    return this.dependencies[name];
  },

  _inject: function(factory) {
    var args;
    var dependencies;

    if (typeof factory === 'function') {
      dependencies = argsList(factory);
    } else if (Array.isArray(factory)) {
      dependencies = factory;
      factory = dependencies.pop();
    } else {
      throw new Error('Unrecognized factory: ' + factory);
    }

    args = dependencies.map(function(dependency) {
      return this.get(dependency);
    }.bind(this));

    return factory.apply(null, args);
  }
};

module.exports = DiContainer;
