const mongoose = require('mongoose')

const TricycleSchema = new mongoose.Schema({
  amount: Number,
  tricycle_metro_number: String,
  date: String,
}, {timestamps: {createdAt: 'created_at', updatedAt: false}})

module.exports = mongoose.model('tricycle', TricycleSchema)