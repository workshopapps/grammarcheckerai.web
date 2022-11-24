"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return /(android)/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
};

exports["default"] = _default;