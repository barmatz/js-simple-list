(function (global) {
  'use strict';

  global.getChildIndex = function (child) {
    var i = 0;

    while ((child = child.previousSibling) !== null) {
      i += 1;
    }

    return i;
  };
  
}(window));