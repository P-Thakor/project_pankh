const mongoose = require('mongoose');
const validator = require('validator');

const masterEventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An Event must have a Name'],
      unique: true,
      trim: true,
      maxlength: [
        200,
        'An Event name must be less than or equal to 20 characters',
      ],
      minlength: [1, 'An Event name must be less than or equal to 1 character'],
    },
    slug: String,
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    description: {
      type: String,
      trim: true,
      required: [true, 'An Event must have a Description'],
    },
    summary: {
      type: String,
      required: [true, 'An Event must have a Summary'],
      trim: true,
    },
    locations: {
      type: String,
      required: [true, 'An Event must have a Location'],
      trim: true,
    },
    Registration: {
      price: {
        type: Number,
      },
      deadline: {
        type: Date,
        // required: [true, 'An Event must have deadline'],
      },
      quantityAvailable: {
        type: Number,
        // required: [true, 'An Event must have fixed Quantity of participants'],
      },
      isAvailable: {
        type: Boolean,
      },
    },
    photo: [String],
    coverImage: {
      type: String,
      // required: ['An Event must have a cover image'],
    },
    contactNumber: {
      type: Number,
      required: [true, "An MasterEvent must have organiser's contact number"],
    },
    contactEmail: {
      type: String,
      required: [true, 'User should have an Email'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid Email'],
    },
    otherEmail: [
      {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email'],
      },
    ],
    clubOrganiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
    },
    creator: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A  MasterEvent must have a Creator'],
    },
    externalLink: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    facultyCoordinators: [
      {
        type: String,
      },
    ],
    studentCoordinators: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const MasterEvent = mongoose.model('MasterEvent', masterEventSchema);

module.exports = MasterEvent;
