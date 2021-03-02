const { registerValidation } = require('../helpers/RouteHelpers')
const User = require('../models/User')
const JWT = require('jsonwebtoken')

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
    
    if (!req.body.remember) {
        const token = JWT.sign(
            {
                iss: 'June Amante',
                sub: req.user._id,  
            },
            process.env.PASS_PHRASE,
            {
                expiresIn: '2h'
            })
        const exp = JWT.decode(token)
        return res.status(200).json({ token, exp: exp.exp })
    }
    else {
        const token = JWT.sign({
            iss: "June Amante",
            sub: req.user._id
        }, process.env.PASS_PHRASE, { expiresIn: '7d'})
        const exp = JWT.decode(token)
        return res.status(200).json({ token, exp: exp.exp })
    }
}


const googleAuth = async (req, res) => {

    try {
        const user = new User({
            method: 'google',
            google: {
                id: req.body.id,
                email: req.body.email,
            },
            name: req.body.name,
            profile: {
                link: true,
                profile_photo: req.body.img
            }
        })
        
        const token = JWT.sign({
            iss: "June Amante",
            sub: user._id
        }, process.env.PASS_PHRASE, { expiresIn: '7d' })
        const exp = JWT.decode(token)

        const userExists = await User.findOne({ "google.id": user.google.id })
        console.log(userExists)
        if (userExists) {
            console.log('exists!')
            return res.status(200).json({token, user, exp: exp})
        }
        else {
            console.log('not exists!')
            await user.save()
            return res.status(200).json({token, user, exp: exp})
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const facebookAuth = (req, res) => {
    const token = JWT.sign({
        iss: "June Amante",
        sub: req.user._id
    }, process.env.PASS_PHRASE, { expiresIn: '7d'})
    const exp = JWT.decode(token)
    return res.status(200).json({ token, exp: exp.exp, user: req.user })
}

const protectedRoute = (req, res) => {
    return res.status(200).json({ msg: 'hello', user: req.user })
}
module.exports = {
    register, login, protectedRoute, googleAuth, facebookAuth
}