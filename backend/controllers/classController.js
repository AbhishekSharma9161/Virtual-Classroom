const asyncHandler = require('express-async-handler');
const Class = require('../models/Class');

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private
const createClass = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const newClass = new Class({
    name,
    description,
    instructor: req.user._id,
  });

  const createdClass = await newClass.save();
  res.status(201).json(createdClass);
});

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate('instructor', 'name');
  res.json(classes);
});

// @desc    Enroll a student in a class
// @route   POST /api/classes/:id/enroll
// @access  Private
const enrollStudent = asyncHandler(async (req, res) => {
  const user = req.user;
  const classId = req.params.id;

  const classToEnroll = await Class.findById(classId);

  if (classToEnroll) {
    if (!classToEnroll.students.includes(user._id)) {
      classToEnroll.students.push(user._id);
      await classToEnroll.save();
      res.json({ message: 'Enrolled successfully' });
    } else {
      res.status(400);
      throw new Error('Already enrolled');
    }
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

module.exports = {
  createClass,
  getClasses,
  enrollStudent,
};
