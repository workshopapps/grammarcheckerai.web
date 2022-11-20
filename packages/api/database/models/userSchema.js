const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken')
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
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1023
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

// jwt auth token
schema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_OPTION});
  return token
}

// Hashing the password
schema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

// comparing the password
schema.methods.comparePassword = async function(reqPassword) {
  const correctPassword = await bcrypt.compare(reqPassword, this.password)
  return correctPassword;
}

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
  password: Joi.string().min(5).required()
});

exports.userCollection = mongoose.model('user', schema);
