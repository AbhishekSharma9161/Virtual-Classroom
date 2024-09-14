const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
  ],
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
