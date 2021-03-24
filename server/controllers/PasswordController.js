const Password = require('../models/Password')
const Cryptr = require('cryptr')
const { UserRefreshClient } = require('google-auth-library')
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
                log_website: l_website.toLowerCase(),
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

const passwords = async (req, res) => {
    try {
        const passwords = await Password.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < passwords.length; i++){
            var log_pass = passwords[i].credentials.log_password == '' ? '' : cryptr.decrypt(passwords[i].credentials.log_password)
            var toPush = {
                log_id: passwords[i]._id,
                log_name: passwords[i].credentials.log_name,
                log_website: passwords[i].credentials.log_website,
                log_url: passwords[i].credentials.log_url,
                log_email: passwords[i].credentials.log_email,
                log_password: log_pass,
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}

const updatePass = async (req, res) => {
    const password = cryptr.encrypt(req.body.pass)
    const owner = await Password.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },{
        $set: {
            "credentials.log_url": req.body.url,
            "credentials.log_email": req.body.email,
            "credentials.log_password": password,
        }
    }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)
            const credentials = {
                log_id: doc._id,
                log_email: doc.credentials.log_email,
                log_name: doc.credentials.log_name,
                log_password: cryptr.decrypt(doc.credentials.log_password),
                log_url: doc.credentials.log_url,
                log_website: doc.credentials.log_website,
            }
            return res.status(200).json({ credentials })
        })
}
module.exports = { addPass, deletePass, passwords, updatePass }