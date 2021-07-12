const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name:{
        type: String,
        required: 'Enter a name',
        min: 3,
        max: 50,

    },
    email:{
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true    
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        select: false,
      },
    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);