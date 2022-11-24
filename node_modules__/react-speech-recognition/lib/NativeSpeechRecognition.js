"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isNative = void 0;
var NativeSpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition);

var isNative = function isNative(SpeechRecognition) {
  return SpeechRecognition === NativeSpeechRecognition;
};

exports.isNative = isNative;
var _default = NativeSpeechRecognition;
exports["default"] = _default;