const { Schema, model } = require('mongoose');
const Joi = require('joi');

const passwordSchema = Schema(
  {
    source: {
      type: String,
      required: [true, 'There must be a source'],
      minlength: 2,
    },
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiSchema = Joi.object({
  source: Joi.string().min(4).required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const Password = model('password', passwordSchema);

module.exports = {
  Password,
  JoiSchema,
};
