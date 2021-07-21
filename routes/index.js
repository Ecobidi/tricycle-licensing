const adminRouter = require('express').Router()
const TricycleRouter = require('./tricycle')
const DriverRouter = require('./driver')
const LicenseRouter = require('./license')
const LoginRouter = require('./login')
const UserRouter = require('./user')

const authorization_middleware = (req, res, next) => {
  if (req.session?.user) next()
  else res.redirect('/login')
}

const logout = (req, res) => {
  req.session.user = null
  req.session.loggedIn = false
  res.redirect('/login')
}

adminRouter.use('/login', LoginRouter)

adminRouter.use(authorization_middleware)

adminRouter.get('/', (req, res) => res.render('dashboard'))

adminRouter.get('/dashboard', (req, res) => res.render('dashboard'))

adminRouter.use('/tricycles', TricycleRouter)

adminRouter.use('/drivers', DriverRouter)

adminRouter.use('/licenses', LicenseRouter)

adminRouter.use('/users', UserRouter)

adminRouter.get('/logout', logout)

module.exports = adminRouter