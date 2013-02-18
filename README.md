
# classdef.js

`classdef` provides some incredibly bare-bones syntactic sugar for declaring classes in Javascript.

It wires up the prototype chain (inheritance) and copies things into the prototype object (your class's definition) *and that's it*. It does not add its own properties or methods to your objects. It does not create a `super` method or property. It has essentially zero features. It's wonderful.

Usage:

```js
var MyClass = classdef([superclass,] [mixins, ...] classDefinition);
```

`classDefinition` should be an object containing all of the functions you want the class to have. If one of those functions is named `constructor`, it will be used as the class's constructor.

You may optionally pass a `superclass` to inherit from, plus any number of `mixins`.
* The superclass may be null.
* You must manually call the superclass's constructor if you want that to happen (e.g. `SuperClass.call(this)`);
* Mixins should be objects. All of their properties will be copied onto the class's prototype, in order. Mixins are usually employed to add additional functions to a class.

## Examples:

```js
// Basic usage
var MyClass = classdef({
  constructor: function() {
    // ...
  },

  someFunc: function() {
    // ...
  }
});

// Here 'Fruit' is the superclass, and 'Edible' and 'Squeezable' are mixins.
var Orange = classdef(Fruit, Edible, Squeezable, {
  constructor: function() {
    Fruit.call(this);
    // ...
  },

  peel: function() {
    // ...
  }
});

// No superclass but mixins
var Foo = classdef(null, Barable, Bazable, {
  constructor: function() {}
});

```

# License
Copyright (c) 2012 Ned Burns
Licensed under the MIT license.
http://github.com/7sempra/classdef/blob/master/LICENSE-MIT