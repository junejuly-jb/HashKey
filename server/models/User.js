const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {  
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
        },
        authentication: {
            type: Boolean,
            default: true
        },
        auth_key: {
            type: String,
            default: ''
        }
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    name: {
        type: String,
        required: true,
    },
    initials: {
        type: String,
        uppercase: true,
    },
    profile: {
        link: {
            type: Boolean
        },
        profile_photo: {
            type: String
        }
    },
    safety_pin: {
        type: String,
        default: null
    },
    user_settings: {
        ask_pin: { type: Boolean, default: true },
        vault_timeout: { type: String, default: '15m'},
        vault_timeout_action: { type: String, default: 'lock' },
        easy_access: { type: Boolean, default: false },
        notification: { type: Boolean, default: false }
    },
    subscription: {
        type: String,
        default: 'free'
    }
})

module.exports = mongoose.model('User', userSchema)