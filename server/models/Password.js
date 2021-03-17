const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    credential_type: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credentials: {
        log_name: {
            type: String
        },
        log_website: {
            type: String
        },
        log_url: {
            type: String
        },
        log_email: {
            type: email
        },
        log_password: {
            type: String
        }
    }
})

module.exports = mongoose.model('Password', loginSchema)