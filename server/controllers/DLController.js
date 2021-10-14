const DLicense = require('../models/License')

const addDLicense = async (req, res) => {
    try {
        const license = new DLicense({
            owner: req.user._id,
            credentials: {
                name: req.body.name,
                number: req.body.number,
                date_issued: req.body.date_issued,
                exp_date: req.body.exp_date
            }
        })

        await license.save()

        const creds = {
            license_id: license._id,
            license_name: license.credentials.name,
            license_number: license.credentials.number,
            license_date_issued: license.credentials.date_issued,
            license_exp_date: license.credentials.exp_date
        }
        return res.status(200).json({ data: creds })
    } catch (error) {
        return res.status(500).json({
            err_message: error.msg,
            err: error
        })
    }
}

const licenses = async (req, res) => {
    try {
        const license = await DLicense.find({ owner: req.user._id })
        const credentials = [];
        for (let i = 0; i < license.length; i++) {
            var toPush = {
                license_id: license[i]._id,
                license_name: license[i].credentials.name,
                license_number: license[i].credentials.number,
                license_date_issued: license[i].credentials.date_issued,
                license_exp_date: license[i].credentials.exp_date,
            }
            credentials.push(toPush)
        }
        return res.status(200).json({ data: credentials.length > 0 ? credentials : [] })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

const removeLicenses = async (req, res) => {
    try {
        await DLicense.deleteMany({ owner: req.user._id, _id: { $in: req.body.ids } })
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

const updateLicense = async (req, res) => {
    await DLicense.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {
        $set: {
            "credentials.name": req.body.name,
            "credentials.number": req.body.number,
            "credentials.date_issued": req.body.date_issued,
            "credentials.exp_date": req.body.exp_date,
        }
    }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)
            const credentials = {
                license_id: doc._id,
                license_name: doc.credentials.name,
                license_number: doc.credentials.number,
                license_date_issued: doc.credentials.date_issued,
                license_exp_date: doc.credentials.exp_date
            }
            return res.status(200).json({ credentials })
        })
}

module.exports = { addDLicense, licenses, removeLicenses, updateLicense }