const TricycleLicenseService = require('../services/tricycle_license')
const LicenseModel = require('../models/tricycle_license')

class TricycleLicenseController {

  static async getAllLicenses(req, res) {
    let licenses
    if (req.query.tricycle_metro_no) {
      licenses = await TricycleLicenseService.findAll({...req.query})
    } else {
      licenses = await TricycleLicenseService.findAll()
    }
    res.render('licenses', { licenses })
  }

  static async getRenewLicensePage(req, res) {
    if (req.query.license_id || req.query.metro_no) {
      let license
      if (req.query.license_id) license = await TricycleLicenseService.findById(req.query.license_id)
      else license = await TricycleLicenseService.findByMetroNo(req.query.metro_no) 
      if (!license) {
        req.flash('error_msg', 'ID does not match any license')
        return res.redirect('/licenses/renew')
      } else {
        res.render('licenses-renew', { license, renewLicense: true })
      }
    }
    res.render('licenses-renew', { renewLicense: false })
  }

  static async handleRenewLicense(req, res) {
    console.log(req.body)
    let { license_id, date_of_expiry, date_of_renewal, amount } = req.body
    try {
      await TricycleLicenseService.updateOne(req.body.license_id, { amount, date_of_renewal, date_of_expiry })
      req.flash('success_msg', 'License Successfully Renewed')
      res.redirect('/licenses')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error Renewing License')
      res.redirect('/licenses/renew')
    }
  }

  static async getExpiredLicenses(req, res) {
    let licenses = await TricycleLicenseService.findExpiredLicenses(new Date())
    res.render('licenses', { licenses })
  }

  static async createLicensePage(req, res) {
    res.render('licenses-edit', { edit: false, license: new LicenseModel() })
  }

  static async createLicense(req, res) {
    try {
      await TricycleLicenseService.save(req.body)
      req.flash('success_msg', 'License Created')
      res.redirect('/licenses')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error ')
      req.redirect('/licenses')      
    }
  }

  static async removeLicense(req, res) {
    try {
      await TricycleLicenseService.removeOne(req.params.license_id)
      res.redirect('/licenses')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/licenses')
    }
  }

}

module.exports = TricycleLicenseController