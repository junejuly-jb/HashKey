const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
        default: 'card'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credentials: {
        card_number: {
            type: String
        },
        card_expiry: {
            type: String
        },
        card_ccv: {
            type: String
        },
        card_color: {
            type: String
        }
    }
})

module.exports = mongoose.model('Card', cardSchema)