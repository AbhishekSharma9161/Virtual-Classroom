const asyncHandler = require('express-async-handler');
const Lecture = require('../models/Lecture');
const Session = require('../models/Session');

// @desc    Create a new lecture
// @route   POST /api/lectures
// @access  Private
const createLecture = asyncHandler(async (req, res) => {
  const { title, content, sessionId } = req.body;

  const session = await Session.findById(sessionId);

  if (session) {
    const lecture = new Lecture({
      title,
      content,
      session: sessionId,
    });

    const createdLecture = await lecture.save();
    session.lectures.push(createdLecture._id);
    await session.save();

    res.status(201).json(createdLecture);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

// @desc    Get lectures for a session
// @route   GET /api/lectures/:sessionId
// @access  Private
const getLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find({ session: req.params.sessionId });
  res.json(lectures);
});

module.exports = {
  createLecture,
  getLectures,
};
