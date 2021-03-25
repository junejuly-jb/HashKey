const Wifi = require('../models/Wifi')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')

const addWifi = async (req, res) => {
    try {
        const { w_ssid, w_security } = req.body
        const w_pass = cryptr.encrypt(req.body.w_pass)
        const wifi = new Wifi({
            owner: req.user._id,
            credentials: {
                wifi_ssid: w_ssid,
                wifi_pass: w_pass,
                wifi_security: w_security,
            }
        })
        await wifi.save()
        wifi.credentials.wifi_pass = cryptr.decrypt(wifi.credentials.wifi_pass)
        return res.status(200).json({ data: wifi })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { addWifi }