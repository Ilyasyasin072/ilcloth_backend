const User = require('../models/user');
const mongoose = require('mongoose')

const index = async (req, res) => {
    if (req.user) {
        try {
            const ObjectId = mongoose.Types.ObjectId;

            var aggregateQuery = User.aggregate([
                {
                    $match: { _id: ObjectId(req.user._id) }
                },
                {
                    $lookup: {
                        from: 'phones',
                        localField: '_id',
                        foreignField: 'user_id', as: 'phone'
                    },
                },
                {
                    $lookup: {
                        from: 'user_addresses',
                        localField: '_id',
                        foreignField: 'user_id', as: 'address'
                    },
                }
            ])

            aggregateQuery.exec(function (err, user) {
                // const data = new ApiResponser('GET', result, 200)
               user.filter(user => {
                const data = {
                    _id: user._id,
                    isActive: {
                        status: user.status
                    },
                    registrationDate: user.registrationDate,
                    roles: [{
                        user: user._id
                    }],
                    name: {
                        first: user.first_name,
                        middle: null,
                        last: user.last_name
                    },
                    phone: user.phone,
                    email: user.email,
                    account: "",
                    address: user.address,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                res.json(data);
               })
            })
            // User.find({
            //     _id: req.user._id
            // }, ((err, user) => {
            //     user.filter(user => {
            //         res.json({
            //             id: user._id,
            //             isActive: {
            //                 status: user.status
            //             },
            //             registrationDate: user.registrationDate,
            //             roles: [{
            //                 user: user._id
            //             }],
            //             name: {
            //                 first: user.first_name,
            //                 middle: null,
            //                 last: user.last_name
            //             },
            //             phone: [
            //                 {
            //                     _id: "id_phone",
            //                     number: user.telephone,
            //                     countryCode: "+62",
            //                     extension: "1234",
            //                     kind: "mobile"
            //                 }
            //             ],
            //             email: user.email,
            //             address: [],
            //             provider: [{
            //                 registrationDate: null,
            //                 isActive: false,
            //                 name: "LOCAL",
            //                 lastLoginDate: null
            //             }],
            //             createdAt: user.createdAt,
            //             updatedAt: user.updatedAt,
            //         })
            //     })
            // }))

            // const data = new responseGetUser('GET', user, 200);

            // res.json(data.data)
        } catch (error) {
            res.json(error.message)
        }
    } else {
        res.json({
            status: 'invalid credentials'
        })
    }
}

module.exports = {
    index
}