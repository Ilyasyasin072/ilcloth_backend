const {Schema, model} = require('../config/connection')

const OrderItemSchema = new Schema({
    // relation to order_detail
    order_id: {
        type: Schema.ObjectId,
        required: true,
        validated: {
            validator : Schema.ObjectId,
            message   : '{VALUE} is not an integer value'
        }
    },
    cart_items : [
        {

            productId: Schema.Types.ObjectId,
            quantity: Number,
            price: Number,
        }
    ]
    // product_id: {
    //     type: Number,
    //     required: true,
    //     validated: {
    //         validator : Number.isInteger,
    //         message   : '{VALUE} is not an integer value'
    //     }
    // },
    // quantity: {
    //     type: Number,
    //     required: true,
    //     validated: {
    //         validator : Number.isInteger,
    //         message   : '{VALUE} is not an integer value'
    //     }
    // }
}, {
    timestamps: true, versionKey: false
})

const OrderItem = model('order_items', OrderItemSchema)


module.exports = OrderItem