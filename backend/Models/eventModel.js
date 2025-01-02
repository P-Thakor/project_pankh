const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
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
  description: {
    type: String,
    trim: true,
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
    quantityAvailabel: {
      type: Number,
      // required: [true, 'An Event must have fixed Quantity of participants'],
    },
    isAvailale: {
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
    required: [true, "An Event must have organiser's contact number"],
  },
  contactEmail: {
    type: String,
    required: [true, 'User should have an Email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
  // {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  // },
  clubOrganiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  creator: {
    type: String,
    required: [true, "An Event must have organiser's name"],
  },
  startDate: Date,
  endDate: Date,
  startTime: Date,
  endTime: Date,
  externalLink: {
    type: String
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

// eventSchema.path('contactNumbr').validate(function validatePhone() {
//   return this.phoneNr > 999999999;
// });

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
