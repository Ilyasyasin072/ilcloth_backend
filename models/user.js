const mongoose = require('mongoose')

const { Schema, model } = mongoose;
let mongooseHidden = require('mongoose-hidden')()

const bcrypt = require('bcrypt');


const UserSchema = new Schema({
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
    telephone: {
        type: Number,
        required: true,
        // unique   : true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    status: {
        type: String,
        // required: true,
        validate: {
            validator: String,
            message: '{VALUE} is not an integer value'
        }
    },
    registrationDate: {
        type: Date,
        default : Date.now
    }

}, {
    timestamps: true, versionKey: false
})

UserSchema.plugin(mongooseHidden)

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

const User = model('users', UserSchema);

module.exports = User