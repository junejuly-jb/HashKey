const Contact = require('../models/Contact')


const addContact = async (req, res) => {
    try {
        const contact = new Contact({
            owner: req.user._id,
            credentials: {
                fname: req.body.c_fname,
                lname: req.body.c_lname,
                number: req.body.c_contact,
                email: req.body.c_email
            }
        })
        await contact.save()

        const creds = {
            contact_id: contact._id,
            contact_fname: contact.credentials.fname,
            contact_lname: contact.credentials.lname,
            contact_number: contact.credentials.number,
            contact_email: contact.credentials.email
        }
        return res.status(200).json({ data: creds })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const contacts = async (req, res) => {
    try {
        const contact = await Contact.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < contact.length; i++) {
            var toPush = {
                contact_id: contact[i]._id,
                contact_fname: contact[i].credentials.fname,
                contact_lname: contact[i].credentials.lname,
                contact_number: contact[i].credentials.number,
                contact_email: contact[i].credentials.email
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ credentials })
    } catch (error) {
        console.log(err)
        return res.status(500).json({ error })
    }
}

const removeContact = async (req, res) => {
    try {
        await Contact.deleteMany({ owner: req.user._id, _id: { $in: req.body.ids } })
            .then((response) => {
                if (response.deletedCount == 0) {
                    throw new Error('Error deleting data')
                }
                else {
                    return res.status(200).json({ msg: 'successfully deleted' })
                }
                
            })
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { addContact, contacts, removeContact }
