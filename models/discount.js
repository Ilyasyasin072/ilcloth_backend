const { Schema, model } = require('../config/connection');

const DiscountSchema = new Schema({
    name: String,
    desc: String,
    discount_percent: {
        type     : Number,
        required : true,
        // unique   : true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
      },
    active : Boolean,
}, {
    timestamps: true, versionKey: false
})

const Discount = model('discount', DiscountSchema);

module.exports = Discount