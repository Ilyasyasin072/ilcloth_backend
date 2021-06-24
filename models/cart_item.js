const { Schema, model } = require('../config/connection')


const mongoose = require('mongoose')
const CartItemSchema = new Schema({
    // relational to shopping session
    // session_id: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
        // ref: 'User'
    },
    // product_id: {
    //     type: Number,
    //     required: true,
    //     validated: {
    //         validator : Number.isInteger,
    //         message   : '{VALUE} is not an integer value'
    //     }
    // },
    products: [
        {
            productId: Schema.Types.ObjectId,
            quantity: Number,
            price: Number,
        }
    ],
    total: {
        type : Number
    },
    // quantity: {
    //     type: Number,
    //     required: true,
    //     validated: {
    //         validator: Number.isInteger,
    //         message: '{VALUE} is not an integer value'
    //     }
    // }
    active: {
        type: Boolean,
        default: true
      },
      modifiedOn: {
        type: Date,
        default: Date.now
      } 
}, {
    timestamps: true, versionKey: false
})

const Cart = model('cart', CartItemSchema)


module.exports = Cart