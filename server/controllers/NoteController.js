const Note = require('../models/Note')

const addNote = async (req, res) => {
    try {
        const { note_title, note_content, note_color } = req.body
        const note = new Note({
            owner: req.user._id,
            credentials: {
                note_title: note_title,
                note_content: note_content,
                note_color: note_color
            }
        })
        await note.save()

        const creds = {
            note_id: note._id,
            note_title: note.credentials.note_title,
            note_content: note.credentials.note_content,
            note_color: note.credentials.note_color
        }
        return res.status(200).json({ data: creds })
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { addNote }