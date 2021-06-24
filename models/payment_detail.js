const {Schema, model} = require('../config/connection')

const PaymentDetailSchema = new Schema({
    // relational to order_detail 1 to 1
    order_id: {
        type: Number,
        required: true,
        validated: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    amount: {
        type: Number,
        required: true,
        validated: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    provider: {
        type: String,
        required: true,
        validated: {
            validator : String,
            message   : '{VALUE} is not an integer value'
        }
    },
    status: {
        type: String,
        required: true,
        validated: {
            validator : String,
            message   : '{VALUE} is not an integer value'
        }
    }
}, {
    timestamps: true, versionKey: false
})

const PaymentDetail = model('payment_detail', PaymentDetailSchema)


module.exports = PaymentDetail