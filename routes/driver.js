const router = require('express').Router()
const DriverController = require('../controllers/driver')

router.get('/', DriverController.getAllDrivers)

router.get('/view/:driver_id', DriverController.getSingleDriverPage)

// router.get('/edit/:driver_id', DriverController.updateDriverPage)

// router.post('/edit/:driver_id', DriverController)

router.get('/new', DriverController.createDriverPage)

router.post('/new', DriverController.createDriver)

router.get('/remove/:driver_id', DriverController.removeDriver)

module.exports = router