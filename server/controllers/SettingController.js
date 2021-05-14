const User = require('../models/User')

const changeTimeout = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id },
            { $set: { "user_settings.vault_timeout": req.body.timeout } },
            { returnOriginal: false, useFindAndModify: false },
            (err, doc) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json({ msg: "updated successfully"})
            }
        )
    } catch (error) {
        return res.status(500).send(error)
    }
}

const changeEasyAccess = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id },
            { $set: { "user_settings.easy_access": req.body.easy_access } },
            { returnOriginal: false, useFindAndModify: false },
            (err, doc) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json({ msg: "updated successfully" })
            }
        )
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = {
    changeTimeout, changeEasyAccess
}