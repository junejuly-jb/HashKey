const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recentSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
},  { timestamps: true })

module.exports = mongoose.model('Recent', recentSchema)