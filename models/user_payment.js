const {  Schema, model } = require('../config/connection');

const SchemaUserPayment = new Schema({
    user_id : Schema.ObjectId,
    payment_type: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        },
    },

    provider: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        },
    },
    account_no: {
        type: Number,
        required: true,
        unique: true,
        validated: {
            validator: Number,
            message: '{VALUE} is not an integer value'
        },
    },
    expiry_at: { date: Date}
}, {
    timestamps: true, versionKey: false
})


const UserPayment = model('user_payment', SchemaUserPayment)

module.exports = UserPayment