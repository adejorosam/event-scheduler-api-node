const Meeting = require('../models/meetings');

const meetingController = { 
    // @desc    Create a new meeting
    // @route   POST /api/v1/meetings
    // @access  Private
    createMeeting: async (req, res) => {
    try{
        req.body.user = req.user._id
        const meeting = await Meeting.create(req.body);
    res.status(201).json({
        success:true, 
        msg: "Meeting created successfully",
        data: meeting
    });
    }catch(error){
        res.status(422).json({
            success: false,
            msg: error.message,
            data: null
        });
    }
    
  },

    // @desc    Get all meetings
    // @route   GET /api/v1/meetings
    // @access  Private
    getMeetings: async (req, res) => {
        const meeting = await Meeting.find();
        res.status(201).json({
            success:true, 
            msg: "Meeting retrieved successfully",
            data: meeting
        });
    },

    // @desc    Get a particular meeting
    // @route   GET /api/v1/meeting/:contactId
    // @access  Private
    getMeeting: async (req, res) => {
        const meeting = await Meeting.find(req.params.meetingId);
        res.status(201).json({
            success:true, 
            msg: "Meeting retrieved successfully",
            data: meeting
        });
    },

    // @desc    Update a particular meeting in the database
    // @route   PATCH /api/v1/meeting/:meetingId
    // @access  Private
    updateMeeting : async (req, res) => {
        const meeting = await Meeting.findOneAndUpdate({_id:req.params.meetingId},req.body, {new:true, useFindAndModify: false}, (err, meeting) => {
            if(err){
                res.send(err);
            }
            res.json(meeting);
        });
    },

    // @desc    Delete a particular meeting in the database
    // @route   DELETE /api/v1/meeting/:meetingId
    // @access  Private
    deleteMeeting : async(req, res) => {
        const meeting = await Meeting.findOneAndRemove({_id:req.params.meetingId},(err, meeting) => {
            if(err){
                res.send(err);
            }
            res.json( {message: "Successfully deleted contact"});
        });
    },

    indexUserMeetings: async(req, res) => {
        // console.log(req.user._id);
        const meetings = await Meeting.findOne({user: req.user._id});
        try{
            res.status(201).json({
                success:true, 
                msg: "Meetings retrieved successfully",
                data: meetings
            });
        }catch(error){
            res.status(500).json({
                // success:true, 
                // msg: "Meetings retrieved successfully",
                data: error.message
            });
        }
        
    }
};

module.exports = meetingController;