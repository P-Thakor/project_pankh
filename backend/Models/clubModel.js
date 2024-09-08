const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Club must have a Name'],
    unique: true,
    trim: true,
    maxlength: [50, 'A Club name must be less than or equal to 50 characters'],
    minlength: [1, 'A Club name must be at least 1 character'],
  },
  description: {
    type: String,
    trim: true,
  },
  foundedDate: {
    type: Date,
    required: [true, 'A Club must have a founded date'],
  },
  image: String,
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
