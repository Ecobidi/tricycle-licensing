const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
  driver_license_no: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  last_name: {
    type: String,
    required: true,
  },
  nin: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  blood_group: String,
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  lga_of_origin: {
    type: String,
  },
  state_of_origin: String,
  passport: {},
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('driver', DriverSchema)