const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wifiSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
        default: 'wifi'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credentials: {
        wifi_ssid: {
            type: String
        },
        wifi_pass: {
            type: String
        },
        wifi_security: {
            type: String
        },
        wifi_status: {
            type: Boolean,
            required: false
        },
        isSecure: {
            type: Boolean
        }
    }
})

module.exports = mongoose.model('Wifi', wifiSchema)