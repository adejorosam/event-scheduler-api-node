const express = require("express");

const meetingController = require("../controllers/meetingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const {
  createMeeting,
  getMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  indexUserMeetings
} = meetingController;

// Meeting routes
router.post("/meetings", authMiddleware, createMeeting);
router.get("/meetings", authMiddleware, getMeetings);
router.get("/meetings/:meetingId", authMiddleware, getMeeting);
router.patch("/meetings/:meetingId", authMiddleware, updateMeeting);
router.delete("/meetings/:meetingId", authMiddleware, deleteMeeting);
router.get("/meetings/organizer", authMiddleware, indexUserMeetings);

module.exports = router;