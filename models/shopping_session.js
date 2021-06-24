const {Schema, model} = require('../config/connection')

const ShoppingSessionSchema = new Schema({
    user_id: Schema.ObjectId,
    total: {
        type: Number,
        required: true,
        validated: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
}, {
    timestamps: true, versionKey: false
})

const ShoppingSession = model('shopping_session', ShoppingSessionSchema)


module.exports = ShoppingSession