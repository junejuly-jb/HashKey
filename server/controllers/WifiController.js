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
module.exports = { addWifi, wifis }