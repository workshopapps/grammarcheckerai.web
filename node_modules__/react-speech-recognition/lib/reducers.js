"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transcriptReducer = void 0;

var _constants = require("./constants");

var _utils = require("./utils");

var transcriptReducer = function transcriptReducer(state, action) {
  switch (action.type) {
    case _constants.CLEAR_TRANSCRIPT:
      return {
        interimTranscript: '',
        finalTranscript: ''
      };

    case _constants.APPEND_TRANSCRIPT:
      return {
        interimTranscript: action.payload.interimTranscript,
        finalTranscript: (0, _utils.concatTranscripts)(state.finalTranscript, action.payload.finalTranscript)
      };

    default:
      throw new Error();
  }
};

exports.transcriptReducer = transcriptReducer;