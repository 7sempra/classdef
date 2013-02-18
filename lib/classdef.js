
// See README.md for examples

module.exports = function(args) {
  var numArgs = arguments.length;
  if (numArgs == 0) {
    return function() {};
  }

  var target = arguments[numArgs - 1];
  var classFunc = target.constructor != Object ? target.constructor
                                               : function() {};
  delete target.constructor;

  var superclass = null;
  var startIndex = 0;
  if (numArgs > 1) {
    superclass = arguments[0];
    startIndex = 1;
  }

  if (superclass) {
    // Note: the user must manually call the superconstructor if you want it to run.
    var tempCtor = function() {};
    tempCtor.prototype = superclass.prototype;
    // this is semi-equivalent to classFunc.prototype.__proto__ = superclass.prototype
    classFunc.prototype = new tempCtor();
    classFunc.prototype.constructor = classFunc;
  }

  for (var a = startIndex; a < numArgs; a++) {
    var methodBlob = arguments[a];
    for (var v in methodBlob) {
      classFunc.prototype[v] = methodBlob[v];
    }
  }

  return classFunc;
};
