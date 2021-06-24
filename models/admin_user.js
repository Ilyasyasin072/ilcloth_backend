const mongoose = require('mongoose')

const { Schema, model } = mongoose;
let mongooseHidden = require('mongoose-hidden')()

const bcrypt = require('bcrypt');


const AdminUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        // unique   : true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    email: {
        type: String,
        required: true,
        // unique   : true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    hash_password:  {
        type: String,
        required: true,
        // unique   : true,
        // hide: true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    first_name:  {
        type: String,
        required: true,
        // unique   : true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    last_name:  {
        type: String,
        required: true,
        // unique   : true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    email:  {
        type: String,
        required: true,
        // unique   : true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    telephone: {
        type: Number,
        required: true,
        // unique   : true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    type_id: {
        type: Number,
        // required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    last_login: {
        type : Date, default: Date.now,
    },

}, {
    timestamps: true, versionKey: false
})

AdminUserSchema.plugin(mongooseHidden)

AdminUserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

const AdminUser = model('admin_user', AdminUserSchema);

module.exports = AdminUser