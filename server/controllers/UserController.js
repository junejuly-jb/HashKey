const { registerValidation } = require('../helpers/RouteHelpers')
const User = require('../models/User')
const JWT = require('jsonwebtoken')

signToken = user => {
    return JWT.sign({
        iss: 'June Amante',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.PASS_PHRASE)
}


const register = async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })
    
    const { email, password } = req.body

    const foundUser = await User.findOne({ 'local.email': email })
    if (foundUser) return res.status(403).json({ error: 'Email already exists' })

    const newUser = new User({ 
        method: 'local',
        local: {
            email: email,
            password: password
        }
     })

    try {
        await newUser.save()
        const token = signToken(newUser)

        return res.status(200).json({ msg: 'user created successfully', token })
    } catch (err) {
        return res.status(500).json({ error: err})
    }

}

const login = (req, res) => {
    const token = signToken(req.user)
    return res.status(200).json({ token })
}


const googleAuth = (req, res) => {
    const token = signToken(req.user)
    return res.status(200).json({ token })
}

const facebookAuth = (req, res) => {
    const token = signToken(req.user)
    return res.status(200).json({ token, user: req.user })
}

const protectedRoute = (req, res) => {
    return res.status(200).json({ msg: 'hello', user: req.user })
}
module.exports = {
    register, login, protectedRoute, googleAuth, facebookAuth
}