const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DLicenseSchema = new Schema({
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
        name: {
            type: String
        },
        number: {
            type: String
        },
        flag: {
            type: String
        },
        exp_date: {
            type: String
        },
        country: {
            type: String
        },
    }
})

module.exports = mongoose.model('DLicense', DLicenseSchema)