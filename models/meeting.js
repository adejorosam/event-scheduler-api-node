const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  

    description:{
        type: String,
        min: 3,
        max: 500
    },
    
    title:{
        type: String,
        required: true,
        min:3,
        max: 200
    },

    meetingTime:{
        type:Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meeting', MeetingSchema);