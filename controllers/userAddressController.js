const UserAddress = require('../models/user_address')

const ApiResponser = require('../traits/ApiResponse');


const index = async (req, res) => {

    if (req.user) {
        try {

            var aggregateQuery = UserAddress.aggregate([

                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id', as: 'users'
                    },
                },
                {

                    $unwind: "$users"

                }

            ])

            aggregateQuery.exec(function (err, result) {
                const data = new ApiResponser('GET', result, 200)
                res.json(data.data);
            })


        } catch (error) {

            res.json(error.message)

        }
    } else {
        res.json({
            'status': 'invalid'
        })
    }
}

const store = async (req, res) => {

    if (req.user) {
        const user_address_form = {
            user_id: req.user._id,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            zipCode: req.body.zipCode,
            country: req.body.country,
            mobile: req.body.mobile,
        }

        try {
            const user_address = UserAddress.create(user_address_form);

            res.json({
                'method': 'POST',
                'result': user_address
            })
        } catch (error) {
            res.json(error.message)
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