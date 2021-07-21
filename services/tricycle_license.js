const TricycleLicenseModel = require('../models/tricycle_license')

class TricycleLicense {

  static async findById(id) {
    return TricycleLicenseModel.findById(id)
  }

  static async findByMetroNo(metro_no) {
    return TricycleLicenseModel.findOne({tricycle_metro_no: metro_no})
  }

  static async findExpiredLicenses(from_date) {
    console.log(from_date)
    return TricycleLicenseModel.find({date_of_expiry: { $gt: from_date }})
  }
  
  static async findAll(query = {}) {
    return TricycleLicenseModel.find(query)
  }

  static async save(dao) {
    return TricycleLicenseModel.create(dao)
  }

  static async updateOne(id, dao) {
    return TricycleLicenseModel.findByIdAndUpdate(id, {$set: {...dao}})
  }

  static async removeOne(id) {
    return TricycleLicenseModel.findByIdAndRemove(id)
  }

}

module.exports = TricycleLicense