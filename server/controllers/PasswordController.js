const Password = require('../models/Password')

const addPass = async (req, res) => {
    try {
        const { l_logname, l_website, l_url, l_pass, l_user } = req.body
        const password = new Password({
            credential_type: 'password',
            owner: req.user._id,
            credentials: {
                log_name: l_logname,
                log_website: l_website,
                log_url: l_url,
                log_email: l_user,
                log_password: l_pass,
            }
        })
        await password.save()
        return res.status(200).json({ data: password })
    } catch (error) {
        return res.send(error)
    }
}

module.exports = { addPass }