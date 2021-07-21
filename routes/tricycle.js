const router = require('express').Router()
const TricycleController = require('../controllers/tricycle')

router.get('/', TricycleController.getAllTricycles)

router.get('/view/:tricycle_id', TricycleController.getSingleTricyclePage)

router.get('/new', TricycleController.createTricylePage)

router.post('/new', TricycleController.createTricycle)

router.get('/remove/:tricycle_id', TricycleController.removeTricycle)

module.exports = router