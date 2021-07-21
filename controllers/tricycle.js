const TricycleService = require('../services/tricycle')
const TricycleModel = require('../models/tricycle')
const DriverService = require('../services/driver')

class TricycleController {

  static async getAllTricycles(req, res) {
    let tricycles
    if (req.query.mode && req.query.mode == 'metro_number') {
      tricycles = await TricycleService.findAll({metro_number: new RegExp(req.query.search, 'ig')})
    } else if (req.query.mode && req.query.mode == 'plate_number') {
      tricycles = await TricycleService.findAll({vehicle_plate_number: new RegExp(req.query.search, 'ig')})
    } else {
      tricycles = await TricycleService.findAll()
    }
    res.render('tricycles', { tricycles })
  }

  static async getSingleTricyclePage(req, res) {
    let tricycle = await TricycleService.findById(req.params.tricycle_id)
    if (!tricycle) {
      req.flash('error_msg', 'ID does not match any tricycle')
      return res.redirect('/tricycles')
    }
    res.render('tricycle-info', {tricycle})
  }

  static async createTricylePage(req, res) {
    let tricycle = new TricycleModel()
    res.render('tricycles-edit', { tricycle, edit: false })
  }

  static async createTricycle(req, res) {
    let dao = req.body
    try {
      let driver = await DriverService.findByLicenseNumber(dao.driver_license_no)
      if (!driver) {
        const error_msg = 'The Driver License Number you provided does not match any driver in our system.'
        return res.render('tricycles-edit', { tricycle: new TricycleModel(dao), error_msg, edit: false })
      }
      dao.driver = driver._id
      await TricycleService.save(dao)
      req.flash('success_msg', 'Tricycle Created')
      res.redirect('/tricycles')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating tricycle')
      req.redirect('/tricycles')
    }
  }

  static async updateTricyclePage(req, res) {
    try {
      let tricycle = await TricycleService.findById(req.params.tricycle_id)
      if (!tricycle) {
        req.flash('error_msg', 'No Tricycle Found With Such ID')
        return res.redirect('/tricycles')
      } 
      res.render('tricycles-edit', { tricycle, edit: true })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      req.redirect('/tricycles')
    }
  }

  static async removeTricycle(req, res) {
    try {
      await TricycleService.removeOne(req.params.tricycle_id)
      res.redirect('/tricycles')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/tricycles')
    }
  }

}

module.exports = TricycleController