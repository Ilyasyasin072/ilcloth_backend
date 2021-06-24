const UserPayment = require('../models/user_payment')
const mongoose = require('mongoose')
const ApiResponser = require('../traits/ApiResponse')

const index = async (req, res) => {

    if (req.user) {
        try {
            let ObjectId = mongoose.Types.ObjectId;

            const aggregateQuery = UserPayment.aggregate([
                {
                    $match: { user_id: ObjectId(req.user._id) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id', as: 'users'
                    },
                },
                {
        
                    $unwind: "$users"
        
                },
            ])


            aggregateQuery.exec((err, result) => {
                if (err) throw err;
        
                const data = new ApiResponser('GET', result, 200)
        
                res.status(200);
        
                res.json(data.data)
            })

        } catch (error) {

            res.json(error.message)

        }
    } else {
        res.json({
            status: 'invalid credentials'
        })
    }

}


const store = async (req, res) => {
    if (req.user.status == 'admin') {
        try {
            let ObjectId = mongoose.Types.ObjectId;

            const payment_form = {
                user_id: ObjectId(req.user._id),
                payment_type: 'Transfer',
                provider: 'BCA',
                account_no: '56469876546',
                expiry_at: '20/12/2020',
            }

            const payment = UserPayment.create(payment_form);

            res.json({
                'status': 'success',
                'data': payment
            })

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
    index,
    store
}
