const router = require('express').Router()
const LicenseController = require('../controllers/tricycle_license')

router.get('/', LicenseController.getAllLicenses)

router.get('/renew', LicenseController.getRenewLicensePage)

router.post('/renew', LicenseController.handleRenewLicense)

router.get('/new', LicenseController.createLicensePage)

router.post('/new', LicenseController.createLicense)

router.get('/expired', LicenseController.getExpiredLicenses)

router.get('/remove/:license_id', LicenseController.removeLicense)

module.exports = router