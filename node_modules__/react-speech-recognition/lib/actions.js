"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendTranscript = exports.clearTranscript = void 0;

var _constants = require("./constants");

var clearTranscript = function clearTranscript() {
  return {
    type: _constants.CLEAR_TRANSCRIPT
  };
};

exports.clearTranscript = clearTranscript;

var appendTranscript = function appendTranscript(interimTranscript, finalTranscript) {
  return {
    type: _constants.APPEND_TRANSCRIPT,
    payload: {
      interimTranscript: interimTranscript,
      finalTranscript: finalTranscript
    }
  };
};

exports.appendTranscript = appendTranscript;