const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
        default: 'contact'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credentials: {
        fname: {
            type: String
        },
        lname: {
            type: String
        },
        number: {
            type: String
        },
        email: {
            type: String
        },
        avatar_color: {
            type: String
        }
    }
})

module.exports = mongoose.model('Contact', contactSchema)