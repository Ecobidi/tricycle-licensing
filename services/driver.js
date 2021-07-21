const DriverModel = require('../models/driver')

class DriverService {
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return DriverModel.find({ last_name: pattern })
  }

  static async findByLicenseNumber(driver_license_no) {
    return DriverModel.findOne({driver_license_no})
  }

  static async findById(id) {
    return DriverModel.findById(id)
  }
  
  static async findAll() {
    return DriverModel.find()
  }

  static async save(dao) {
    return DriverModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return DriverModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return DriverModel.findByIdAndRemove(id)
  }

}

module.exports = DriverService