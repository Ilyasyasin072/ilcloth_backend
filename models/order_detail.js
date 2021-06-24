const {Schema, model} = require('../config/connection')

const OrderDetailSchema = new Schema({
    // user_id: {
    //     type: Number,
    //     required: true,
    //     validated: {
    //         validator : Number.isInteger,
    //         message   : '{VALUE} is not an integer value'
    //     }
    // },
    user_id: Schema.ObjectId,
    total: {
        type: String,
        required: true,
        validated: {
            validator : String,
            message   : '{VALUE} is not an integer value'
        }
    },
    payment_id: {
        type: Number,
        required: true,
        validated: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }
}, {
    timestamps: true, versionKey: false
})

const OrderDetail = model('order_details', OrderDetailSchema)


module.exports = OrderDetail