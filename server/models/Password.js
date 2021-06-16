const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
        default: 'password'
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
            type: String
        },
        log_password: {
            type: String
        },
        isSecure: {
            type: Boolean
        }
    }
})

module.exports = mongoose.model('Password', loginSchema)