const { registerValidation } = require('../helpers/RouteHelpers')
const User = require('../models/User')
const JWT = require('jsonwebtoken')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
require('dotenv').config()

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
            password: password,
        },
        name: name,
        initials: getInitials(name),
        profile: {
            link: false,
            profile_photo: ''
        }
     })

    newUser.local.auth_key = cryptr.encrypt(newUser._id)

    try {
        await newUser.save(async (err, user) => {
            if (err) {
                return res.status(400, 'Bad request')
            }
            else {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'ernest.heidenreich@ethereal.email',
                        pass: 'ed1Y7Jvgee2ryCT73e',
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Hashkey" <hashkey@sample.com>', // sender address
                    to: user.local.email, // list of receivers
                    subject: "Authentication Request", 
                    html: html(user.local.auth_key)
                });
            }

        })
        return res.status(200).json({ msg: 'Registered Successfully' })
    } catch (err) {
        return res.status(400).send('Error occured unexpectedly')
    }

}

const login = (req, res) => {
    
    const token = JWT.sign({ _id: req.user._id }, process.env.PASS_PHRASE, { expiresIn: req.user.user_settings.vault_timeout })
    // const token = JWT.sign({ _id: req.user._id }, process.env.PASS_PHRASE, { expiresIn: '2h' })
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
            }
        })

        const token = JWT.sign({ _id: user._id}, process.env.PASS_PHRASE, { expiresIn: user.user_settings.vault_timeout })
        const exp = JWT.decode(token)

        const userExists = await User.findOne({ "google.id": user.google.id })
        if (userExists) {
            const token = JWT.sign({ _id: userExists._id}, process.env.PASS_PHRASE, { expiresIn: userExists.user_settings.vault_timeout })
            return res.status(200).json({ token, user: userExists, exp: exp.exp })
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
    console.log('fb auth', req.user )
    const token = JWT.sign({ _id: req.user._id }, process.env.PASS_PHRASE, { expiresIn: req.user.user_settings.vault_timeout })
    const exp = JWT.decode(token)
    return res.status(200).json({ token, exp: exp.exp, user: req.user })
}

const addPin = async (req, res) => {
    try {
        const pin = cryptr.encrypt(req.body.pin)
        await User.updateOne({ _id: req.user._id }, { safety_pin: pin })
            .then(() => {
                return res.status(200).json({ msg: 'pin successfully added' })
        })
    } catch (error) {
        return res.status(400).send('Error occured')
    }
}

const updateProfile = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id },
            { $set: { "profile.profile_photo": req.body.photo } },
            { returnOriginal: false, useFindAndModify: false },
            (err, doc) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json({ msg: "updated successfully", data: doc.profile.profile_photo })
            }
        )
    } catch (error) {
        return res.status(500).send('Error occured')
    }
}

const removeProfilePhoto = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id },
            { $set: { "profile.profile_photo": "" } },
            { returnOriginal: false, useFindAndModify: false },
            (err, doc) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json({ msg: 'profile remove successfully' })
            }
        )
    } catch (err) {
        return res.status(500).send('Error occured')
    }
}

const authenticatePin = async (req, res) => {
    try {
        const pin = await User.findOne({ _id: req.user._id })
        const user_pin = cryptr.decrypt(pin.safety_pin)
        if (user_pin == req.body.pin) return res.status(200).json({ success: true })
        return res.status(200).json({ success: false })
    } catch (error) {
        return res.send(500)
    }
}

const checkIfMatchPass = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        const isMatch = await bcrypt.compare(req.body.password, user.local.password)
        if (!isMatch) return res.status(200).json({ success: false })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updatePassword = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await User.findOneAndUpdate({ _id: req.user._id }, { $set: { "local.password": hashedPassword } },
            { returnOriginal: false, useFindAndModify: false }, function (err, doc) {
                if (err) return res.status(500).send(err)
                return res.status(200).json({ success: true })
            }
        )
    } catch (error) {
        return res.status(500).send(error)
    }
}

const html = (auth_key) => {
    return `
        <div style="width: 100%; background-color: light-grey">
            <div style="width: 400px; height: 400px; background-color: white">
                <div>
                    <h1>Welcome to <b>Hashkey ****</b></h1>
                    <div style="margin-bottom: 30px;">
                        <p>Please verify your email to start using the app.<br>
                            Please click the button to verify
                        </p>
                    </div>
                    <a style="
                    background-color: blue;
                    text-decoration: none;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    " href="#" value="${auth_key}">Vefiry Account</a>
                </div>
            </div>
        </div>
    `
}

const sendEmail = (receiver, auth_string) => {
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASSWORD
    //     },
    // });

    // let mailOptions = {
    //     from: 'junearagons@gmail.com',
    //     to: user.local.email,
    //     subject: "Authentication",
    //     // html: html(user.local.auth_key),
    // };

    // transporter.sendMail(mailOptions, function (err, data) {
    //     if (err) { console.log(err) }
    //     else { console.log('email sent!') }
    // })
}
module.exports = {
    register, login, googleAuth, facebookAuth, addPin, updateProfile, removeProfilePhoto, authenticatePin,
    checkIfMatchPass, updatePassword }