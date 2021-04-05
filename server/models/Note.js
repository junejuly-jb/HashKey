const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    credential_type: {
        type: String,
        required: true,
        default: 'note'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credentials: {
        note_title: {
            type: String
        },
        note_content: {
            type: String
        },
        note_color: {
            type: String
        }
    }
})

module.exports = mongoose.model('Note', noteSchema)