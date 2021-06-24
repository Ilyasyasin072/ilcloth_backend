const Phone = require('../models/phone')

const index = async (req, res) => {
    res.json({
        link: 'admin type index'
    })
}

const store = async (req, res) => {

    if (req.user) {
        try {
            const { number, countryCode, extension, kind } = req.body
            // console.log(number, countryCode, extension , kind, req.user._id)

            let user_phone = {
                number: number,
                countryCode: countryCode,
                extension: extension,
                kind: kind,
                user_id: req.user._id
            }

            const phone_user = await Phone.create(user_phone)

            res.json(phone_user);

        } catch (error) {
            res.json(error.message);
        }
    } else {
        res.json({
            message: 'invalid creadential'
        })
    }
}

module.exports = {
    index,
    store
}