const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Lecture = require('../models/Lecture');

// @desc    Add a comment to a lecture
// @route   POST /api/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { content, lectureId, parentCommentId } = req.body;

  const lecture = await Lecture.findById(lectureId);

  if (lecture) {
    const comment = new Comment({
      content,
      author: req.user._id,
      lecture: lectureId,
      parentComment: parentCommentId || null,
    });

    const createdComment = await comment.save();

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      parentComment.replies.push(createdComment._id);
      await parentComment.save();
    }

    lecture.comments.push(createdComment._id);
    await lecture.save();

    res.status(201).json(createdComment);
  } else {
    res.status(404);
    throw new Error('Lecture not found');
  }
});

// @desc    Get comments for a lecture
// @route   GET /api/comments/:lectureId
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ lecture: req.params.lectureId })
    .populate('author', 'name')
    .populate('replies');

  res.json(comments);
});

module.exports = {
  addComment,
  getComments,
};
