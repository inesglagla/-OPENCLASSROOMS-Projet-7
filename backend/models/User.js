const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema ({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  picture: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  birthday: { type: String, required: true },
  adress: { type: String, required: true },
  phone: { type: Number, required: true },
  job: { type: String, required: true },
  jobdate: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);