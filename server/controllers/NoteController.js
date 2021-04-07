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

const notes = async (req, res) => {
    try {
        const note = await Note.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < note.length; i++){
            var toPush = {
                note_id: note[i]._id,
                note_title: note[i].credentials.note_title,
                note_content: note[i].credentials.note_content,
                note_color: note[i].credentials.note_color
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}

const removeNote = async (req, res) => {
    try {
        await Note.deleteMany({ _id: { $in: req.body.ids } })
            .then(() => {
            return res.status(200).json({ msg: 'deleted!'})
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateNote = async (req, res) => {
    await Note.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },{
        $set: {
            "credentials.note_title": req.body.title,
            "credentials.note_content": req.body.content,
            "credentials.note_color": req.body.color
        }
    }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)
            const credentials = {
                note_id: doc._id,
                note_title: doc.credentials.note_title,
                note_content: doc.credentials.note_content,
                note_color: doc.credentials.note_color
            }
            return res.status(200).json({ credentials })
        })
}
module.exports = { addNote, notes, removeNote, updateNote }