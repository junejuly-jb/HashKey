const api = require('express').Router();

const UserController = require('../controllers/UserController')
const PasswordController = require('../controllers/PasswordController')
const passport = require('passport')
const passportConf = require('../passport')
const auth = require('../auth')

api.post('/register', UserController.register)
api.post('/login', passport.authenticate('local', { session: false }), UserController.login)
api.post('/oauth/googleplus', UserController.googleAuth)
api.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), UserController.facebookAuth)
api.post('/add-pin', auth, UserController.addPin)


// password route
api.post('/add-password', auth, PasswordController.addPass)
api.post('/delete-password', auth, PasswordController.deletePass)
api.get('/passwords', auth, PasswordController.passwords)
module.exports = api