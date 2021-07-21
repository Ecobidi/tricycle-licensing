const DriverService = require('../services/driver')

class DriverController {

  static async getAllDrivers(req, res) {
    let drivers
    if (req.query.search && req.query.search.length > 1) {
      drivers = await DriverService.findByName(req.query.search) 
    } else {
      drivers = await DriverService.findAll()
    }
    res.render('drivers', { drivers})
  }

  static async getSingleDriverPage(req, res) {
    let driver = await DriverService.findById(req.params.driver_id)
    if (!driver) {
      req.flash('error_msg', 'ID does not match any driver')
      return res.redirect('/drivers')
    }
    res.render('driver-info', {driver})
  }

  static async createDriverPage(req, res) {
    res.render('drivers-edit', { edit: false })
  }

  static async createDriver(req, res) {
    try {
      await DriverService.save(req.body)
      req.flash('success_msg', 'Driver Created')
      res.redirect('/drivers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating driver')
      req.redirect('/drivers')
    }
  }

  // static async updateDriverPage(req, res) {
  //   try {
  //     let driver = await DriverService.findById(req.params.driver_id)
  //     if (!driver) {
  //       req.flash('error_msg', 'No Driver Found With Such ID')
  //       return res.redirect('/drivers')
  //     } 
  //     res.render('drivers-edit', { driver, edit: true })
  //   } catch (error) {
  //     console.log(error)
  //     req.flash('error_msg', 'An Error Occurred')
  //     req.redirect('/drivers')
  //   }
  // }

  static async removeDriver(req, res) {
    try {
      await DriverService.removeOne(req.params.driver_id)
      res.redirect('/drivers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/drivers')
    }
  }

}

module.exports = DriverController