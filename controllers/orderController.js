const OrderItem = require('../models/order_item')
const OrderDetail = require('../models/order_detail')

const mongoose = require('mongoose')
class OrderItemClass {

    index = async (req, res) => {

        if(req.user) {

            try {
                const ObjectId = mongoose.Types.ObjectId;
    
                var aggregateQuery = OrderDetail.aggregate([
                    {
                        $match: { user_id: ObjectId(req.user._id) }
                    },
                    {
                        $lookup: {
                            from: 'order_items',
                            localField: '_id',
                            foreignField: 'order_id', as: 'order_items'
                        },
                    },
    
                ])
    
                aggregateQuery.exec(function (err, result) {
                    if (result != '') {
                        res.json(result);
                    } else {
                        res.json({
                            empty: 'empty'
                        });
                    }
                })
            } catch (error) {
                res.json(error.message)
            }

        } else {
            res.json({
                'status': 'invalid credentials'
            })
        }

    }
}


const OrderClass = new OrderItemClass

module.exports = OrderClass