const api = require('express').Router();

const UserController = require('../controllers/UserController')
const PasswordController = require('../controllers/PasswordController')
const WifiController = require('../controllers/WifiController')
const NoteController = require('../controllers/NoteController')
const CardController = require('../controllers/CardController')
const SettingController = require('../controllers/SettingController')
const passport = require('passport')
const passportConf = require('../passport')
const auth = require('../auth')

api.post('/register', UserController.register)
api.post('/login', passport.authenticate('local', { session: false }), UserController.login)
api.post('/oauth/googleplus', UserController.googleAuth)
api.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), UserController.facebookAuth)
api.post('/add-pin', auth, UserController.addPin)
api.get('/fetch-secured-credentials', auth, PasswordController.fetchSecuredCredentials)

// password route
api.post('/add-password', auth, PasswordController.addPass)
api.post('/delete-password', auth, PasswordController.deletePass)
api.get('/passwords', auth, PasswordController.passwords)
api.put('/update-password/:id', auth, PasswordController.updatePass)

//wifi route
api.post('/add-wifi', auth, WifiController.addWifi)
api.get('/wifis', auth, WifiController.wifis)
api.post('/delete-wifi', auth, WifiController.removeWifi)
api.put('/update-wifi/:id', auth, WifiController.updateWifi)

// note route
api.post('/add-note', auth, NoteController.addNote)
api.get('/notes', auth, NoteController.notes)
api.post('/delete-note', auth, NoteController.removeNote)
api.put('/update-note/:id', auth, NoteController.updateNote)

// card routes
api.post('/add-card', auth, CardController.addCard)
api.get('/cards', auth, CardController.cards)
api.post('/delete-card', auth, CardController.removeCard)
api.put('/update-card/:id', auth, CardController.updateCard)


//user settings
api.post('/update-user-timeout', auth, SettingController.changeTimeout)
api.post('/update-easy-access', auth, SettingController.changeEasyAccess)
api.post('/update-notification', auth, SettingController.changeNotifications)
api.post('/update-profile-photo', auth, UserController.updateProfile)
api.delete('/remove-profile-photo/:id', auth, UserController.removeProfilePhoto)
api.post('/auth-pin', auth, UserController.authenticatePin)
api.post('/check-if-matched', auth, UserController.checkIfMatchPass)
api.post('/change-user-password', auth, UserController.updatePassword)

module.exports = api