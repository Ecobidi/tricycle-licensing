const mongoose = require('mongoose')

const TricycleLicenseSchema = new mongoose.Schema({
  amount_paid: {
    type: Number,
    required: true,
  },
  date_of_expiry: {
    type: String,
    required: true,
  },
  date_of_renewal: {
    type: String,
    required: true,
  },
  tricycle_metro_no: String,
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('tricycle_license', TricycleLicenseSchema)