const Password = require('../models/Password')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')

const addPass = async (req, res) => {
    try {
        const { l_logname, l_website, l_url, l_user } = req.body
        const l_pass = cryptr.encrypt(req.body.l_pass)
        const password = new Password({
            credential_type: 'password',
            owner: req.user._id,
            credentials: {
                log_name: l_logname,
                log_website: l_website,
                log_url: l_url,
                log_email: l_user,
                log_password: l_pass,
            }
        })
        await password.save()
        password.credentials.log_password = cryptr.decrypt(password.credentials.log_password)
        return res.status(200).json({ data: password })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const deletePass = async (req, res) => {
    try {
        await Password.deleteMany({ _id: { $in: req.body.ids } })
            .then(() => {
            return res.status(200).json({ msg: 'deleted!'})
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = { addPass, deletePass }