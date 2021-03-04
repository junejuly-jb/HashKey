const { registerValidation } = require('../helpers/RouteHelpers')
const User = require('../models/User')
const JWT = require('jsonwebtoken')

const register = async (req, res) => {

    var getInitials = function (string) {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    
    const { email, password, name, remember_me } = req.body

    const foundUser = await User.findOne({ 'local.email': email })
    if (foundUser) return res.status(403).send('User already exists')

    const newUser = new User({ 
        method: 'local',
        local: {
            email: email,
            password: password
        },
        name: name,
        initials: getInitials(name),
        profile: {
            link: false,
            profile_photo: ''
        }
     })

    try {
        await newUser.save()
        if (remember_me) {
            const token = JWT.sign(
                {
                    iss: 'June Amante',
                    sub: newUser._id,
                },
                process.env.PASS_PHRASE,
                {
                    expiresIn: '1h'
                })
            const exp = JWT.decode(token)
            return res.status(200).json({ token, user: newUser, exp: exp.exp })
        }
        else {
            return res.status(200).json({ msg: 'Registered Successfully' })
        }
    } catch (err) {
        return res.status(400).send('Error occured unexpectedly')
    }

}

const login = (req, res) => {
    
    const token = JWT.sign({
        iss: "June Amante",
        sub: req.user._id
    }, process.env.PASS_PHRASE, { expiresIn: '1h'})
    const exp = JWT.decode(token)
    return res.status(200).json({ token, exp: exp.exp, user: req.user })
    
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
            },
            safety_pin: ''
        })
        
        const token = JWT.sign({
            iss: "June Amante",
            sub: user._id
        }, process.env.PASS_PHRASE, { expiresIn: '1h' })
        const exp = JWT.decode(token)

        const userExists = await User.findOne({ "google.id": user.google.id })
        if (userExists) {
            return res.status(200).json({token, user, exp: exp.exp})
        }
        else {
            await user.save()
            return res.status(200).json({token, user, exp: exp.exp})
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const facebookAuth = (req, res) => {
    const token = JWT.sign({
        iss: "June Amante",
        sub: req.user._id
    }, process.env.PASS_PHRASE, { expiresIn: '1h'})
    const exp = JWT.decode(token)
    return res.status(200).json({ token, exp: exp.exp, user: req.user })
}

const protectedRoute = (req, res) => {
    return res.status(200).json({ msg: 'hello', user: req.user })
}
module.exports = {
    register, login, protectedRoute, googleAuth, facebookAuth
}