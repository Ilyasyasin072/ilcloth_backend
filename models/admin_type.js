const {Schema, model} = require('../config/connection')

const adminTypeSchema = new Schema({
    admin_type: {
        type: String,
        required: true,
        validated: {
            validator : String,
            message   : '{VALUE} is not an integer value'
        }
    },
    permissions: {
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

const AdminType = model('admin_type', adminTypeSchema)


module.exports = AdminType