'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var SetHelpers = require('../internals/set-helpers');

var Set = SetHelpers.Set;
var aSet = SetHelpers.aSet;
var add = SetHelpers.add;
var iterate = SetHelpers.iterate;

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      add(newSet, boundFunction(value, value, set));
    });
    return newSet;
  }
});
