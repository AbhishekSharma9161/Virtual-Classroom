const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
}, {
  timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
