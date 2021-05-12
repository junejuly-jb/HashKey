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
        vault_timeout_action: { type: String, default: 'lock'}  
    },
    subscription: {
        type: String,
        default: 'free'
    }
})

userSchema.pre('save', async function (next) {
    try {
        console.log('pre save')
        if (this.method != 'local') {
            next()
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.local.password, salt)

        this.local.password = hashedPassword
        next()
    } catch (error) {
        next(err)
    }
} )

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        console.log('isvalid')
        return bcrypt.compare(newPassword, this.local.password)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoose.model('User', userSchema)