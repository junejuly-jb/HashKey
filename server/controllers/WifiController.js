const Wifi = require('../models/Wifi')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')

const addWifi = async (req, res) => {
    try {
        const { w_ssid, w_security, w_status } = req.body
        const w_pass = cryptr.encrypt(req.body.w_pass)
        const wifi = new Wifi({
            owner: req.user._id,
            credentials: {
                wifi_ssid: w_ssid,
                wifi_pass: w_pass,
                wifi_security: w_security,
                wifi_status: w_status
            }
        })
        await wifi.save()
        wifi.credentials.wifi_pass = cryptr.decrypt(wifi.credentials.wifi_pass)
        const creds = {
            wifi_id: wifi._id,
            wifi_ssid: wifi.credentials.wifi_ssid,
            wifi_pass: wifi.credentials.wifi_pass,
            wifi_security: wifi.credentials.wifi_security,
            wifi_status: wifi.credentials.wifi_status
        }
        return res.status(200).json({ data: creds })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const wifis = async (req, res) => {
    try {
        const wifi = await Wifi.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < wifi.length; i++){
            var wifi_pass = wifi[i].credentials.log_password == '' ? '' : cryptr.decrypt(wifi[i].credentials.wifi_pass)
            var toPush = {
                wifi_id: wifi[i]._id,
                wifi_ssid: wifi[i].credentials.wifi_ssid,
                wifi_pass: wifi_pass,
                wifi_security: wifi[i].credentials.wifi_security,
                wifi_status: wifi[i].credentials.wifi_status
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}
    
const removeWifi = async (req, res) => {
    try {
        await Wifi.deleteMany({ _id: { $in: req.body.ids } })
            .then(() => {
            return res.status(200).json({ msg: 'deleted!'})
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const updateWifi = async (req, res) => {
    const pass = cryptr.encrypt(req.body.pass)
    await Wifi.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },{
        $set: {
            "credentials.wifi_ssid": req.body.ssid,
            "credentials.wifi_pass": pass,
            "credentials.wifi_security": req.body.security,
            "credentials.wifi_status": req.body.status,
        }
    }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)
            const credentials = {
                wifi_id: doc._id,
                wifi_ssid: doc.credentials.wifi_ssid,
                wifi_pass: cryptr.decrypt(doc.credentials.wifi_pass),
                wifi_security: doc.credentials.wifi_security,
                wifi_status: doc.credentials.wifi_status
            }
            return res.status(200).json({ credentials })
        })
}

module.exports = { addWifi, wifis, removeWifi, updateWifi }