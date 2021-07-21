const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  surname: {
    type: String
  },
  role: {
    type: String,
    default: 'admin',
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('user', UserSchema)