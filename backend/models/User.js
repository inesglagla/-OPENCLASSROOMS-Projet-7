const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema ({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  picture: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  birthday: { type: Number, required: true },
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  job: { type: String, required: true },
  jobdate: { type: Number, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);