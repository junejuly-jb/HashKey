const Card = require('../models/Card')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('HellNaw!')

const addCard = async (req, res) => {
    try {
        const card_number = cryptr.encrypt(req.body.card_number)
        const card_expiry = cryptr.encrypt(req.body.card_expiry)
        const card_ccv = cryptr.encrypt(req.body.card_ccv)
        const card = new Card({
            owner: req.user._id,
            credentials: {
                card_number: card_number,
                card_expiry: card_expiry,
                card_ccv: card_ccv
            }
        })
        await card.save()
        card.credentials.card_number = cryptr.decrypt(card.credentials.card_number)
        card.credentials.card_expiry = cryptr.decrypt(card.credentials.card_expiry)
        card.credentials.card_ccv = cryptr.decrypt(card.credentials.card_ccv)
        const creds = {
            card_id: card._id,
            card_number: card.credentials.card_number,
            card_expiry: card.credentials.card_expiry,
            card_ccv: card.credentials.card_ccv
        }
        return res.status(200).json({ data: creds })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const cards = async (req, res) => {
    try {
        const card = await Card.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < card.length; i++) {
            var card_number = card[i].credentials.card_number == '' ? '' : cryptr.decrypt(card[i].credentials.card_number)
            var card_expiry = card[i].credentials.card_expiry == '' ? '' : cryptr.decrypt(card[i].credentials.card_expiry)
            var card_ccv = card[i].credentials.card_ccv == '' ? '' : cryptr.decrypt(card[i].credentials.card_ccv)
            var toPush = {
                card_id: card[i]._id,
                card_number: card_number,
                card_expiry: card_expiry,
                card_ccv: card_ccv
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}

// const removeWifi = async (req, res) => {
//     try {
//         await Wifi.deleteMany({ _id: { $in: req.body.ids } })
//             .then(() => {
//                 return res.status(200).json({ msg: 'deleted!' })
//             })
//     } catch (error) {
//         return res.status(500).send(error)
//     }
// }
// const updateWifi = async (req, res) => {
//     const pass = cryptr.encrypt(req.body.pass)
//     await Wifi.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {
//         $set: {
//             "credentials.wifi_ssid": req.body.ssid,
//             "credentials.wifi_pass": pass,
//             "credentials.wifi_security": req.body.security,
//             "credentials.wifi_status": req.body.status,
//         }
//     }, { returnOriginal: false, useFindAndModify: false },
//         (err, doc) => {
//             if (err) return res.status(500).send(err)
//             const credentials = {
//                 wifi_id: doc._id,
//                 wifi_ssid: doc.credentials.wifi_ssid,
//                 wifi_pass: cryptr.decrypt(doc.credentials.wifi_pass),
//                 wifi_security: doc.credentials.wifi_security,
//                 wifi_status: doc.credentials.wifi_status
//             }
//             return res.status(200).json({ credentials })
//         })
// }

module.exports = { addCard, cards }
    // , wifis, removeWifi, updateWifi