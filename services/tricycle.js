const TricycleModel = require('../models/tricycle')

class TricycleService {

  static async findById(id) {
    return TricycleModel.findById(id).populate('driver').exec()
  }

  // static async findByVehicle(query) {
  //   return TricycleModel.find(query).populate('driver').exec()
  // }
  
  static async findAll(query = {}) {
    return TricycleModel.find(query).populate('driver').exec()
  }

  static async save(dao) {
    return TricycleModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return TricycleModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return TricycleModel.findByIdAndRemove(id)
  }

}

module.exports = TricycleService