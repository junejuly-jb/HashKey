const api = require('express').Router();

const UserController = require('../controllers/UserController')
const passport = require('passport')
const passportConf = require('../passport')
const auth = require('../auth')

api.post('/register', UserController.register)
api.post('/login', passport.authenticate('local', { session: false }), UserController.login)
// api.post('/oauth/google', passport.authenticate('googleToken', { session: false }), UserController.googleAuth)
api.post('/oauth/googleplus', UserController.googleAuth)
api.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), UserController.facebookAuth)
api.post('/add-pin', auth, UserController.addPin)
api.get('/secret', auth , UserController.protectedRoute)

module.exports = api