const { v4 } = require('uuid');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { environment } = require('../../config/environment');

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    displayName: {
      type: String,
    },

    language: {
      type: String,
      default: 'English',
    },

    deviceID: {
      type: String,
      default: () => v4(),
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Signup and login schema
 * The return value is a Joi object in all cases.
 *
 *
 */

// jwt auth token
schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, environment.JWT_SECRET, {
    expiresIn: '3d',
  });
  return token;
};

exports.authValidatorSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'xyz', 'io', 'co', 'org'] },
    })
    .lowercase()
    .required(),
});

exports.userCollection = mongoose.model('user', schema);
