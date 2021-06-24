const {Schema, model} = require('../config/connection')

const SchemaPhone = new Schema({
    user_id : Schema.ObjectId,
    number: {
        type : String,
    },

    countryCode: {
        type: String
    },

    extension: {
        type: String
    },

    kind: {
        type: String
    },

},{
    timestamps: true, versionKey: false
})


const Phone = model('phone', SchemaPhone)


module.exports = Phone