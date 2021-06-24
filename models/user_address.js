const { Schema, model } = require('../config/connection');

const SchemaUserAddress = new Schema({

    user_id : Schema.ObjectId,
    address_line1: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    address_line2: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    city: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    zipCode: {
        type: Number,
        required: true,
        validated: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    country: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    // telephone: {
    //     type: String,
    //     required: true,
    //     validated: {
    //         validator: String,
    //         message: '{VALUE} is not an integer value'
    //     }
    // },
    isDefault: {
        type: String,
        default : false
    },
    isValidated: {
        type: String,
        default: false
    },
    mobile: {
        type: String,
        required: true,
        validated: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    }
}, {
    timestamps: true, versionKey: false
})


const UserAddress = model('user_address', SchemaUserAddress)

module.exports = UserAddress