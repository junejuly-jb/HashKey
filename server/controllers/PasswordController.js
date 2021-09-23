const Password = require('../models/Password')
const Wifi = require('../models/Wifi')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')

const addPass = async (req, res) => {
    try {
        const { l_logname, l_website, l_url, l_user, isSecure } = req.body
        const l_pass = cryptr.encrypt(req.body.l_pass)
        const password = new Password({
            owner: req.user._id,
            credentials: {
                log_name: l_logname,
                log_website: l_website.toLowerCase(),
                log_url: l_url,
                log_email: l_user,
                log_password: l_pass,
                isSecure: isSecure
            }
        })
        await password.save()
        password.credentials.log_password = cryptr.decrypt(password.credentials.log_password)
        const creds = {
            log_id: password._id,
            log_name: password.credentials.log_name,
            log_website: password.credentials.log_website,
            log_url: password.credentials.log_url,
            log_email: password.credentials.log_email,
            log_password: password.credentials.log_password,
        }
        return res.status(200).json({ data: creds })
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
            .catch(err => {
                res.status(500).send(err)
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
    
const fetchSecuredCredentials = async (req, res) => {
    try {
        const wifis = await Wifi.find({ owner: req.user._id })
        const passwords = await Password.find({ owner: req.user._id })
        const total = wifis.length + passwords.length
        const creds = []
        for (let i = 0; i < wifis.length; i++) {
            if (!wifis[i].credentials.isSecure) {
                creds.push({
                    id: wifis[i]._id,
                    name: wifis[i].credentials.wifi_ssid,
                    pass: cryptr.decrypt(wifis[i].credentials.wifi_pass),
                    cred_type: wifis[i].credential_type
                })
            }
        }
        for (let j = 0; j < passwords.length; j++) {
            if (!passwords[j].credentials.isSecure) {
                creds.push({
                    id: passwords[j]._id,
                    name: passwords[j].credentials.log_name,
                    pass: cryptr.decrypt(passwords[j].credentials.log_password),
                    cred_type: passwords[j].credential_type
                })
            }
        }
        return res.status(200).json({ data: creds, data_length: total })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const changeSecurity = async (req, res) => {
    try {
        if (req.body.cred_type == 'password') {
            await Password.findOneAndUpdate({ _id: req.params.id, owner: req.user._id}, { $set: { "credentials.isSecure": true } }, { useFindAndModify: false })
                .then(() => {
                    res.status(200).send('password ignored successfully')
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        }
        else {
            await Wifi.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { $set: { "credentials.isSecure": true } }, { useFindAndModify: false })
                .then(() => {
                    res.status(200).send('password ignored successfully')
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        }
        
        return res.status(200).json({ pass })
    } catch (error) {
        res.status(500).send(err)
    }
}

const changeWeakPassword = async (req, res) => {
    try {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if (!strongPassword.test(req.body.pass)) {
            return res.status(200).json({ success: false, msg: 'password is weak'})
        }
        else {
            if (req.body.cred_type == 'wifi') {
                await Wifi.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },
                    {
                        $set: { "credentials.wifi_pass": cryptr.encrypt(req.body.pass), "credentials.isSecure": true }
                    },
                    { returnOriginal: false, useFindAndModify: false },
                )
                    .then(() => {
                        return res.status(200).json({ success: true, msg: "change password successfully" })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
            }
            else {
                await Password.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },
                    {
                        $set: { "credentials.log_password": cryptr.encrypt(req.body.pass), "credentials.isSecure": true }
                    },
                    { returnOriginal: false, useFindAndModify: false }
                )
                    .then(() => {
                        return res.status(200).json({ success: true, msg: "change password successfully" })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
            }
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = { addPass, deletePass, passwords, updatePass, fetchSecuredCredentials, changeSecurity, changeWeakPassword }