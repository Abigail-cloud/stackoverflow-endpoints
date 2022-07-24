const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Kindly add a name'],
    },
    email: {
      type: String,
      required: [true, 'Kindly add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Kindly add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema);