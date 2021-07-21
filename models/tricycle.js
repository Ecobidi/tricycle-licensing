const mongoose = require('mongoose')

const TricycleSchema = new mongoose.Schema({
  vin: { // vehicle_identification_number
    type: String,
    required: true,
  },
  metro_number: {
    type: String,
    required: true,
  },
  engine_no: String,
  color: String,
  vehicle_year: String,
  vehicle_model: String,
  mode_of_ownership: {
    type: String,
    enum: ['hire-purchase', 'private']
  },
  owner_name: String,
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
  },
  vehicle_plate_number: {
    type: String,
    required: true,
  },
  evidence_of_ownership: {}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('tricycle', TricycleSchema)