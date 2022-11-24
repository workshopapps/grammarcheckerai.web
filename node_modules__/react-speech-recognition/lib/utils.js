"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserSupportsPolyfills = exports.compareTwoStringsUsingDiceCoefficient = exports.commandToRegExp = exports.concatTranscripts = exports.debounce = void 0;

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

exports.debounce = debounce;

var concatTranscripts = function concatTranscripts() {
  for (var _len = arguments.length, transcriptParts = new Array(_len), _key = 0; _key < _len; _key++) {
    transcriptParts[_key] = arguments[_key];
  }

  return transcriptParts.map(function (t) {
    return t.trim();
  }).join(' ').trim();
}; // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.


exports.concatTranscripts = concatTranscripts;
var optionalParam = /\s*\((.*?)\)\s*/g;
var optionalRegex = /(\(\?:[^)]+\))\?/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*/g;
var escapeRegExp = /[-{}[\]+?.,\\^$|#]/g;

var commandToRegExp = function commandToRegExp(command) {
  if (command instanceof RegExp) {
    return new RegExp(command.source, 'i');
  }

  command = command.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
    return optional ? match : '([^\\s]+)';
  }).replace(splatParam, '(.*?)').replace(optionalRegex, '\\s*$1?\\s*');
  return new RegExp('^' + command + '$', 'i');
}; // this is from https://github.com/aceakash/string-similarity


exports.commandToRegExp = commandToRegExp;

var compareTwoStringsUsingDiceCoefficient = function compareTwoStringsUsingDiceCoefficient(first, second) {
  first = first.replace(/\s+/g, '').toLowerCase();
  second = second.replace(/\s+/g, '').toLowerCase();
  if (!first.length && !second.length) return 1; // if both are empty strings

  if (!first.length || !second.length) return 0; // if only one is empty string

  if (first === second) return 1; // identical

  if (first.length === 1 && second.length === 1) return 0; // both are 1-letter strings

  if (first.length < 2 || second.length < 2) return 0; // if either is a 1-letter string

  var firstBigrams = new Map();

  for (var i = 0; i < first.length - 1; i++) {
    var bigram = first.substring(i, i + 2);
    var count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }

  var intersectionSize = 0;

  for (var _i = 0; _i < second.length - 1; _i++) {
    var _bigram = second.substring(_i, _i + 2);

    var _count = firstBigrams.has(_bigram) ? firstBigrams.get(_bigram) : 0;

    if (_count > 0) {
      firstBigrams.set(_bigram, _count - 1);
      intersectionSize++;
    }
  }

  return 2.0 * intersectionSize / (first.length + second.length - 2);
};

exports.compareTwoStringsUsingDiceCoefficient = compareTwoStringsUsingDiceCoefficient;

var browserSupportsPolyfills = function browserSupportsPolyfills() {
  return typeof window !== 'undefined' && window.navigator !== undefined && window.navigator.mediaDevices !== undefined && window.navigator.mediaDevices.getUserMedia !== undefined && (window.AudioContext !== undefined || window.webkitAudioContext !== undefined);
};

exports.browserSupportsPolyfills = browserSupportsPolyfills;