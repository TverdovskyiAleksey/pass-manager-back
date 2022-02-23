const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'There must be a username'],
      minlength: 4,
    },
    password: {
      type: String,
      required: [true, 'There must be a password'],
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const User = model('User', userSchema);

module.exports = {
  User,
  joiSchema,
};
