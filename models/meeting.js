const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const MeetingSchema = new Schema({
    name:{
        type: String,
        required: 'Enter a name',
        min: 3,
        max: 50,

    },

    description:{
        type: string,
        required: 'Enter a desc'
    },
    
    title:{
        type: String,
        required: true,
        min:3,
        max: 200
    },

    created_date:{
        type: Date,
        default: Date.now
    }
});