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

module.exports = { addContact }
