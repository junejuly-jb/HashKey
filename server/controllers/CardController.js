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
                card_ccv: card_ccv,
                card_color: req.body.card_color
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
            card_ccv: card.credentials.card_ccv,
            card_color: card.credentials.card_color
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
                card_ccv: card_ccv,
                card_color: card[i].credentials.card_color,
                card_selected: false
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}

const removeCard = async (req, res) => {
    try {
        await Card.deleteMany({ _id: { $in: req.body.ids } })
            .then(() => {
                return res.status(200).json({ msg: 'deleted!' })
            })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateCard = async (req, res) => {
    await Card.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {
        $set: {
            "credentials.card_number": cryptr.encrypt(req.body.card_number),
            "credentials.card_expiry": cryptr.encrypt(req.body.card_expiry),
            "credentials.card_ccv": cryptr.encrypt(req.body.card_ccv),
            "credentials.card_color": req.body.card_color
        }
    }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)
            const credentials = {
                card_id: doc._id,
                card_number: cryptr.decrypt(doc.credentials.card_number),
                card_expiry: cryptr.decrypt(doc.credentials.card_expiry),
                card_ccv: cryptr.decrypt(doc.credentials.card_ccv),
                card_color: doc.credentials.card_color
            }
            return res.status(200).json({ credentials })
        })
}

module.exports = { addCard, cards, removeCard, updateCard }